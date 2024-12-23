import { useUser } from "@/features/auth/hooks/use-user";
import { posAtom } from "@/features/global-state/atoms/pos-atom";
import { StateView } from "@/features/input/components/state-view";
import { useInputRef } from "@/features/input/hooks/use-input-ref";
import { useRemote } from "@/features/remote/hooks/use-remote";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { Layer, Rect, Stage, Text } from "react-konva";
import { Html } from "react-konva-utils";
import { SignInView } from "./sign-in-view";

const WIDTH = 640;
const HEIGHT = 480;
const BOX_WIDTH = 50;
const BOX_HEIGHT = 50;

export default function MainFrame() {
  const [pos, setPos] = useAtom(posAtom);
  const { inputRef } = useInputRef();
  const { user, isLoading } = useUser();

  const { remote: remote0 } = useRemote();
  const remote = useMemo(() => {
    if (!remote0) return [];
    return Object.fromEntries(Object.entries(remote0).filter(([key]) => key !== user?.uid));
  }, [remote0, user]);

  const myname = useMemo(() => {
    const uid = user?.uid || "";
    return remote0?.[uid]?.name || "";
  }, [remote0, user]);

  useEffect(() => {
    const delay = 10;
    const interval = setInterval(() => {
      dispatchEvent(new CustomEvent("tick"));
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const listener = () => {
      if (!user) return;
      const axes = inputRef.current.axes;
      const addX = axes.gamepad.x + axes.keyboard.x;
      const addY = axes.gamepad.y + axes.keyboard.y;
      setPos((pos) => {
        let newX = pos.x + addX;
        let newY = pos.y + addY;
        if (newX < 0) {
          newX = 0;
        }
        if (newY < 0) {
          newY = 0;
        }
        if (newX > WIDTH - BOX_WIDTH) {
          newX = WIDTH - BOX_WIDTH;
        }
        if (newY > HEIGHT - BOX_HEIGHT) {
          newY = HEIGHT - BOX_HEIGHT;
        }
        return { ...pos, x: newX, y: newY };
      });
    };
    window.addEventListener("tick", listener);
    return () => {
      window.removeEventListener("tick", listener);
    };
  }, [inputRef, setPos, user]);

  return (
    <Stage width={WIDTH} height={HEIGHT} className="relative">
      <Layer>
        <Rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="#ffffff" />
      </Layer>
      <Layer>
        <Html>
          <StateView />
        </Html>
      </Layer>

      {Object.values(remote).map(({ pos, name }) => (
        <Layer key={name}>
          <Rect x={pos.x} y={pos.y} width={BOX_WIDTH} height={BOX_HEIGHT} fill="#f0f0f0" />
          <Text x={pos.x} y={pos.y} text={name} />
        </Layer>
      ))}
      <Layer>
        <Rect x={pos.x} y={pos.y} width={BOX_WIDTH} height={BOX_HEIGHT} fill="#00f0f0" />
        <Text x={pos.x} y={pos.y} text={myname} />
      </Layer>

      {!isLoading && !user && (
        <Layer>
          <Rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="#f0f0f0" />
          <Html divProps={{ className: "inset-0 flex items-center justify-center" }}>
            <SignInView />
          </Html>
        </Layer>
      )}
    </Stage>
  );
}

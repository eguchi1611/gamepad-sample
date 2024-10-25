import { useUser } from "@/features/auth/hooks/use-user";
import { posAtom } from "@/features/global-state/atoms/pos-atom";
import { StateView } from "@/features/input/components/state-view";
import { useGamepadControl } from "@/features/input/hooks/use-gamepad-control";
import { useInputRef } from "@/features/input/hooks/use-input-ref";
import { useKeyboardControl } from "@/features/input/hooks/use-keyboard-control";
import { useRemote } from "@/features/remote/hooks/use-remote";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { Layer, Rect, Stage, Text } from "react-konva";
import { Html } from "react-konva-utils";
import { useRemotePos } from "../hooks/use-remote-pos";
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

  useRemotePos();
  useKeyboardControl();
  useGamepadControl();

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
      const axes = inputRef.current.axes;
      const addX = axes.gamepad.x + axes.keyboard.x;
      const addY = axes.gamepad.y + axes.keyboard.y;
      // if (addX !== 0) {
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
      // }
      // if (addY !== 0) {
      //   setPos((pos) => ({ ...pos, y: pos.y + addY }));
      // }
    };
    window.addEventListener("tick", listener);
    return () => {
      window.removeEventListener("tick", listener);
    };
  }, [inputRef, setPos]);

  return (
    <Stage width={WIDTH} height={HEIGHT} className="relative">
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

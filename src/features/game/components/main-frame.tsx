import { useUser } from "@/features/auth/hooks/use-user";
import { posAtom } from "@/features/global-state/atoms/pos-atom";
import { StateView } from "@/features/input/components/state-view";
import { useGamepadControl } from "@/features/input/hooks/use-gamepad-control";
import { useInputRef } from "@/features/input/hooks/use-input-ref";
import { useKeyboardControl } from "@/features/input/hooks/use-keyboard-control";
import { database } from "@/firebase";
import { ref, update } from "firebase/database";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Layer, Rect, Stage } from "react-konva";
import { Html } from "react-konva-utils";
import { SignInView } from "./sign-in-view";

export default function MainFrame() {
  const [pos, setPos] = useAtom(posAtom);
  const { inputRef } = useInputRef();

  const { user, isLoading } = useUser();

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
      if (addX !== 0) {
        setPos((pos) => ({ ...pos, x: pos.x + addX }));
      }
      if (addY !== 0) {
        setPos((pos) => ({ ...pos, y: pos.y + addY }));
      }
    };
    window.addEventListener("tick", listener);
    return () => {
      window.removeEventListener("tick", listener);
    };
  }, [inputRef, setPos]);

  useEffect(() => {
    if (!user) return;
    update(ref(database, `users/${user.uid}/pos`), pos);
  }, [user, pos]);

  return (
    <Stage width={640} height={480} className="relative">
      <Layer>
        <Html>
          <StateView />
        </Html>
      </Layer>

      <Layer>
        <Rect x={pos.x} y={pos.y} width={50} height={50} fill="#00f0f0" />
      </Layer>
      {!isLoading && !user && (
        <Layer>
          <Rect x={0} y={0} width={640} height={480} fill="#f0f0f0" />
          <Html divProps={{ className: "inset-0 flex items-center justify-center" }}>
            <SignInView />
          </Html>
        </Layer>
      )}
    </Stage>
  );
}

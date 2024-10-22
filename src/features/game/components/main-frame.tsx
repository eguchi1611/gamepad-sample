import { StateView } from "@/features/gamepad/components/state-view";
import { useGamepadControl } from "@/features/gamepad/hooks/use-gamepad-control";
import { useInputRef } from "@/features/gamepad/hooks/use-input-ref";
import { useKeyboardControl } from "@/features/gamepad/hooks/use-keyboard-control";
import { posAtom } from "@/features/global-state/atoms/pos-atom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Layer, Rect, Stage } from "react-konva";
import { Html } from "react-konva-utils";

export default function MainFrame() {
  const [pos, setPos] = useAtom(posAtom);
  const { inputRef } = useInputRef();

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
    </Stage>
  );
}

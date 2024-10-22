import { useInputRef } from "@/features/gamepad/hooks/use-input-ref";
import { useKeyboardControl } from "@/features/gamepad/hooks/use-keyboard-control";
import { useEffect, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";

interface Position {
  x: number;
  y: number;
}

export default function MainFrame() {
  const [pos, setPos] = useState<Position>({ x: 20, y: 20 });
  const { inputRef } = useInputRef();

  useKeyboardControl();

  // console.log("render");

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
      // console.dir(JSON.stringify(gamepadstatus));
    };
    window.addEventListener("tick", listener);
    return () => {
      window.removeEventListener("tick", listener);
    };
  }, [inputRef]);

  useEffect(() => {
    const listener = () => {
      for (const gamepad of navigator.getGamepads()) {
        if (!gamepad) continue;
        if (Math.abs(gamepad.axes[0]) > 0.05) {
          inputRef.current.axes.gamepad.x = gamepad.axes[0] * 2;
        } else {
          inputRef.current.axes.gamepad.x = 0;
        }
        if (Math.abs(gamepad.axes[1]) > 0.05) {
          inputRef.current.axes.gamepad.y = gamepad.axes[1] * 2;
        } else {
          inputRef.current.axes.gamepad.y = 0;
        }
      }
    };
    window.addEventListener("tick", listener);
    return () => {
      window.removeEventListener("tick", listener);
    };
  }, [inputRef]);

  useEffect(() => {
    const listener = () => {
      const addX = inputRef.current.axes.gamepad.x + inputRef.current.axes.keyboard.x;
      const addY = inputRef.current.axes.gamepad.y + inputRef.current.axes.keyboard.y;
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
  }, [inputRef]);

  useEffect(() => {
    const listener = (e: GamepadEvent) => {
      console.log(
        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index,
        e.gamepad.id,
        e.gamepad.buttons.length,
        e.gamepad.axes.length,
      );
    };
    window.addEventListener("gamepadconnected", listener);
    return () => {
      window.removeEventListener("gamepadconnected", listener);
    };
  }, []);

  return (
    <Stage width={640} height={480}>
      <Layer>
        <Rect x={pos.x} y={pos.y} width={50} height={50} fill="#00f0f0" />
      </Layer>
    </Stage>
  );
}

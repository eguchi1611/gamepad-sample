import { useEffect, useRef, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";

interface Position {
  x: number;
  y: number;
}

export default function MainFrame() {
  const [pos, setPos] = useState<Position>({ x: 20, y: 20 });
  const pressedKeys = useRef<string[]>([]);

  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      pressedKeys.current = pressedKeys.current.includes(e.key) ? pressedKeys.current : [...pressedKeys.current, e.key];
    };
    window.addEventListener("keydown", keyDownListener);

    const keyUpListener = (e: KeyboardEvent) => {
      pressedKeys.current = pressedKeys.current.filter((key) => key !== e.key);
    };
    window.addEventListener("keyup", keyUpListener);

    return () => {
      window.removeEventListener("keydown", keyDownListener);
      window.removeEventListener("keyup", keyUpListener);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      for (const gamepad of navigator.getGamepads()) {
        if (!gamepad) {
          continue;
        }
        gamepad.buttons.forEach((button, index) => {
          if (button.pressed) {
            console.log(`Button ${index} pressed`);
          }
        });
        setPos((prev) => ({ x: prev.x + gamepad.axes[0] * 5, y: prev.y }));
        setPos((prev) => ({ x: prev.x, y: prev.y + gamepad.axes[1] * 5 }));
      }

      const DELTA = 3;
      pressedKeys.current.forEach((key) => {
        if (key === "ArrowRight" || key === "d") {
          setPos((prev) => ({ x: prev.x + DELTA, y: prev.y }));
        }
        if (key === "ArrowLeft" || key === "a") {
          setPos((prev) => ({ x: prev.x - DELTA, y: prev.y }));
        }
        if (key === "ArrowUp" || key === "w") {
          setPos((prev) => ({ x: prev.x, y: prev.y - DELTA }));
        }
        if (key === "ArrowDown" || key === "s") {
          setPos((prev) => ({ x: prev.x, y: prev.y + DELTA }));
        }
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [pressedKeys]);

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

import { useEffect, useRef, useState } from "react";
import { Layer, Rect, Stage, Text } from "react-konva";

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
      console.log(pressedKeys.current);
    }, 1000 / 60);

    return () => {
      clearInterval(interval);
    };
  }, [pressedKeys]);

  return (
    <Stage width={640} height={480}>
      <Layer>
        <Text text="Hello, World!" fontSize={64} />
        <Rect x={pos.x} y={pos.y} width={50} height={50} fill="#00f0f0" />
      </Layer>
    </Stage>
  );
}

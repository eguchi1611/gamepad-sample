import { useEffect, useRef } from "react";
import { useInputRef } from "./use-input-ref";
import { calcSpeed } from "../utils/calc-speed";

export function useKeyboardControl() {
  const { inputRef } = useInputRef();
  const pressedKeys = useRef<string[]>([]);

  useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      if (!pressedKeys.current.includes(e.key)) {
        pressedKeys.current.push(e.key.toLowerCase());
      }
    };
    const keyupListener = (e: KeyboardEvent) => {
      pressedKeys.current = pressedKeys.current.filter((key) => key !== e.key.toLowerCase());
    };

    window.addEventListener("keydown", keydownListener);
    window.addEventListener("keyup", keyupListener);
    return () => {
      window.removeEventListener("keydown", keydownListener);
      window.removeEventListener("keyup", keyupListener);
    };
  }, []);

  useEffect(() => {
    const listener = () => {
      let x = 0;
      let y = 0;
      for (const key of pressedKeys.current) {
        switch (key) {
          case "w":
            y -= 1;
            break;
          case "a":
            x -= 1;
            break;
          case "s":
            y += 1;
            break;
          case "d":
            x += 1;
            break;
        }
        // 斜め移動の場合の正規化
        if (x !== 0 || y !== 0) {
          const length = Math.sqrt(x ** 2 + y ** 2);
          x /= length;
          y /= length;
        }
      }

      inputRef.current.speed.keyboard.shift = pressedKeys.current.includes("shift");
      inputRef.current.speed.keyboard.control = pressedKeys.current.includes("control");

      const speed = calcSpeed(inputRef.current);
      inputRef.current.axes.keyboard.x = x * speed;
      inputRef.current.axes.keyboard.y = y * speed;
    };
    window.addEventListener("tick", listener);
    return () => {
      window.removeEventListener("tick", listener);
    };
  }, [inputRef]);
}

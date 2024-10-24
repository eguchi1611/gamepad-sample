import { useEffect, useRef } from "react";
import { useInputRef } from "./use-input-ref";

export function useKeyboardControl() {
  const { inputRef } = useInputRef();
  const pressedKeys = useRef<string[]>([]);

  useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      if (!isValidKey(e.key)) return;
      if (!pressedKeys.current.includes(e.key)) {
        pressedKeys.current.push(e.key);
      }
    };
    const keyupListener = (e: KeyboardEvent) => {
      if (!isValidKey(e.key)) return;
      pressedKeys.current = pressedKeys.current.filter((key) => key !== e.key);
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
      }
      // 斜め移動の場合の正規化
      if (x !== 0 || y !== 0) {
        const length = Math.sqrt(x ** 2 + y ** 2);
        x /= length;
        y /= length;
      }
      const delta = 2;
      inputRef.current.axes.keyboard.x = x * delta;
      inputRef.current.axes.keyboard.y = y * delta;
    };
    window.addEventListener("tick", listener);
    return () => {
      window.removeEventListener("tick", listener);
    };
  }, [inputRef]);
}

function isValidKey(key: string) {
  return ["w", "a", "s", "d"].includes(key);
}

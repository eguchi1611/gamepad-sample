import { useEffect } from "react";
import { useInputRef } from "./use-input-ref";
import { calcSpeed } from "../utils/calc-speed";

export function useGamepadControl() {
  const { inputRef } = useInputRef();

  useEffect(() => {
    const listener = () => {
      for (const gamepad of navigator.getGamepads()) {
        if (!gamepad) continue;
        inputRef.current.speed.gamepad.shift = gamepad.buttons[1].pressed;
        inputRef.current.speed.gamepad.control = gamepad.buttons[4].pressed;

        const speed = calcSpeed(inputRef.current);

        inputRef.current.axes.gamepad.x = Math.abs(gamepad.axes[0]) > 0.05 ? gamepad.axes[0] * speed : 0;
        inputRef.current.axes.gamepad.y = Math.abs(gamepad.axes[1]) > 0.05 ? gamepad.axes[1] * speed : 0;
      }
    };
    window.addEventListener("tick", listener);
    return () => {
      window.removeEventListener("tick", listener);
    };
  }, [inputRef]);
}

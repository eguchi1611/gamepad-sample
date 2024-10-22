import { useEffect } from "react";
import { useInputRef } from "./use-input-ref";

export function useGamepadControl() {
  const { inputRef } = useInputRef();

  useEffect(() => {
    const listener = () => {
      for (const gamepad of navigator.getGamepads()) {
        if (!gamepad) continue;
        const delta = 2;
        inputRef.current.axes.gamepad.x = Math.abs(gamepad.axes[0]) > 0.05 ? gamepad.axes[0] * delta : 0;
        inputRef.current.axes.gamepad.y = Math.abs(gamepad.axes[1]) > 0.05 ? gamepad.axes[1] * delta : 0;
      }
    };
    window.addEventListener("tick", listener);
    return () => {
      window.removeEventListener("tick", listener);
    };
  }, [inputRef]);
}

import { PropsWithChildren, useRef } from "react";
import { InputState } from "../types/input-state";
import { InputContext } from "../hooks/use-input-ref";

export function InputProvider({ children }: PropsWithChildren) {
  const ref = useRef<InputState>({
    axes: {
      gamepad: { x: 0, y: 0 },
      keyboard: { x: 0, y: 0 },
    },
  });
  return <InputContext.Provider value={ref}>{children}</InputContext.Provider>;
}

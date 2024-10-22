import { PropsWithChildren, useRef } from "react";
import { GamepadContext } from "../hooks/use-gamepad";
import { GamepadStatus } from "../types/gamepad";

export function GamepadProvider({ children }: PropsWithChildren) {
  const ref = useRef<GamepadStatus>({ axes: [0, 0] });
  const data = ref.current;
  return <GamepadContext.Provider value={data}>{children}</GamepadContext.Provider>;
}

import { createContext, useContext } from "react";
import { GamepadStatus } from "../types/gamepad";

export const GamepadContext = createContext<GamepadStatus | null>(null);

export function useGamepad() {
  const gamepad = useContext(GamepadContext);
  if (!gamepad) {
    throw new Error("GamepadContext is not provided");
  }
  return { gamepadstatus: gamepad };
}

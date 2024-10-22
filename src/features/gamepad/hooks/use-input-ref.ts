import { createContext, MutableRefObject, useContext } from "react";
import { InputState } from "../types/input-state";

export const InputContext = createContext<MutableRefObject<InputState> | null>(null);

export function useInputRef() {
  const inputRef = useContext(InputContext);
  if (!inputRef) {
    throw new Error("GamepadContext is not provided");
  }
  return { inputRef };
}

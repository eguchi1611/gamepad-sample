import { InputState } from "../types/input-state";

export function calcSpeed(inputState: InputState) {
  const shift = inputState.speed.keyboard.shift || inputState.speed.gamepad.shift;
  const control = inputState.speed.keyboard.control || inputState.speed.gamepad.control;
  if (shift && !control) {
    return 4;
  } else if (control && !shift) {
    return 1;
  } else {
    return 2;
  }
}

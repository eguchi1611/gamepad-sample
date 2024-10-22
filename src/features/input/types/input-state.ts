export interface InputState {
  axes: {
    [key in "keyboard" | "gamepad"]: { x: number; y: number };
  };
}

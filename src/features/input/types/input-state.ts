export interface InputState {
  axes: {
    [key in "keyboard" | "gamepad"]: { x: number; y: number };
  };
  speed: {
    [key in "keyboard" | "gamepad"]: {
      shift: boolean;
      control: boolean;
    };
  };
}

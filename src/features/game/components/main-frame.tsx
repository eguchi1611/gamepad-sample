import { useGamepad } from "@/features/gamepad/hooks/use-gamepad";
import { useEffect, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";

interface Position {
  x: number;
  y: number;
}

export default function MainFrame() {
  const [pos, setPos] = useState<Position>({ x: 20, y: 20 });
  const { gamepadstatus } = useGamepad();

  // console.log("render");

  useEffect(() => {
    const delay = 10;
    const interval = setInterval(() => {
      dispatchEvent(new CustomEvent("tick"));
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const listener = () => {
      console.dir(JSON.stringify(gamepadstatus));
    };
    window.addEventListener("tick", listener);
    return () => {
      window.removeEventListener("tick", listener);
    };
  }, [gamepadstatus]);

  useEffect(() => {
    console.log("================gamepad updated================");
  }, [gamepadstatus]);

  useEffect(() => {
    const listener = () => {
      for (const gamepad of navigator.getGamepads()) {
        if (!gamepad) continue;
        if (Math.abs(gamepad.axes[0]) > 0.05) {
          gamepadstatus.axes[0] = gamepad.axes[0] * 2;
        } else {
          gamepadstatus.axes[0] = 0;
        }
        if (Math.abs(gamepad.axes[1]) > 0.05) {
          gamepadstatus.axes[1] = gamepad.axes[1] * 2;
        } else {
          gamepadstatus.axes[1] = 0;
        }
      }
    };
    window.addEventListener("tick", listener);
    return () => {
      window.removeEventListener("tick", listener);
    };
  }, [gamepadstatus]);

  useEffect(() => {
    const listener = () => {
      if (!isNaN(gamepadstatus.axes[0]) && gamepadstatus.axes[0] !== 0) {
        setPos((pos) => ({ ...pos, x: pos.x + gamepadstatus.axes[0] }));
      }
      if (!isNaN(gamepadstatus.axes[1]) && gamepadstatus.axes[1] !== 0) {
        setPos((pos) => ({ ...pos, y: pos.y + gamepadstatus.axes[1] }));
      }
    };
    window.addEventListener("tick", listener);
    return () => {
      window.removeEventListener("tick", listener);
    };
  }, [gamepadstatus]);

  useEffect(() => {
    const listener = (e: GamepadEvent) => {
      console.log(
        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index,
        e.gamepad.id,
        e.gamepad.buttons.length,
        e.gamepad.axes.length,
      );
    };
    window.addEventListener("gamepadconnected", listener);
    return () => {
      window.removeEventListener("gamepadconnected", listener);
    };
  }, []);

  return (
    <Stage width={640} height={480}>
      <Layer>
        <Rect x={pos.x} y={pos.y} width={50} height={50} fill="#00f0f0" />
      </Layer>
    </Stage>
  );
}

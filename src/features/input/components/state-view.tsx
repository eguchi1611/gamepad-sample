import { useEffect, useState } from "react";
import { useInputRef } from "../hooks/use-input-ref";
import { useAtom } from "jotai";
import { posAtom } from "@/features/global-state/atoms/pos-atom";
import { calcSpeed } from "../utils/calc-speed";

export function StateView() {
  const { inputRef } = useInputRef();
  const [pos] = useAtom(posAtom);
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    const listener = () => {
      setStatus(`Position: ${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, Speed: ${calcSpeed(inputRef.current)}`);
    };
    window.addEventListener("tick", listener);
    return () => {
      window.removeEventListener("tick", listener);
    };
  }, [inputRef, pos]);

  return (
    <div className="bg-white/50 font-mono text-lg font-bold">
      <p>
        {/* Position: {pos.x.toFixed(2)}, {pos.y.toFixed(2)}, Speed: {pos.speed} */}
        {status}
      </p>
    </div>
  );
}

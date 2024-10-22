import { posAtom } from "@/features/global-state/atoms/pos-atom";
import { useAtom } from "jotai";

export function StateView() {
  const [pos] = useAtom(posAtom);
  return (
    <div className="bg-white/50 text-lg font-bold font-mono">
      <p>
        Position: {pos.x.toFixed(2)}, {pos.y.toFixed(2)}
      </p>
    </div>
  );
}

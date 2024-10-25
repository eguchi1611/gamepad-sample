"use client";

import { useRemotePos } from "@/features/game/hooks/use-remote-pos";
import { initializedAtom } from "@/features/global-state/atoms/initialized";
import { useGamepadControl } from "@/features/input/hooks/use-gamepad-control";
import { useKeyboardControl } from "@/features/input/hooks/use-keyboard-control";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("@/features/game/components/main-frame"), { ssr: false });

export function View() {
  const [initialized] = useAtom(initializedAtom);

  useRemotePos();
  useKeyboardControl();
  useGamepadControl();

  return (
    <div className="grid h-full place-content-center space-y-2">
      <table className="border">
        <thead>
          <tr>
            <th></th>
            <th>移動</th>
            <th>スピードアップ</th>
            <th>スピードダウン</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>キーボード</th>
            <td>WASD</td>
            <td>Shift</td>
            <td>Control</td>
          </tr>
          <tr>
            <th>ゲームパッド</th>
            <td>左スティック</td>
            <td>B</td>
            <td>Y</td>
          </tr>
        </tbody>
      </table>
      <div className="relative h-[482px] w-[642px] border">
        <div className="absolute inset-0 -z-10 m-auto size-fit text-3xl">読み込み中...</div>
        <div className={`opacity-0 transition-opacity duration-500 ${initialized ? "opacity-100" : ""} }`}>
          <MainFrame />
        </div>
      </div>
      <div>
        <button type="button" onClick={() => signOut(auth)}>
          Sign out
        </button>
      </div>
    </div>
  );
}

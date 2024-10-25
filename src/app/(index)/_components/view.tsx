"use client";

import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("@/features/game/components/main-frame"), { ssr: false });

export function View() {
  return (
    <div className="grid h-full place-content-center space-y-2">
      <table className="border">
        <tbody>
          <tr>
            <th>キーボード</th>
            <td>WASD: 移動, Shift: 高速, Control: 低速</td>
          </tr>
          <tr>
            <th>ゲームパッド</th>
            <td>左スティック: 移動, B: 高速, Y: 低速</td>
          </tr>
        </tbody>
      </table>
      <div className="border">
        <MainFrame />
      </div>
      <div>
        <button type="button" onClick={() => signOut(auth)}>
          Sign out
        </button>
      </div>
    </div>
  );
}

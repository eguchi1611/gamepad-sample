"use client";

import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("@/features/game/components/main-frame"), { ssr: false });

export function View() {
  return (
    <div className="grid h-full place-content-center">
      <div>
        <button type="button" onClick={() => signOut(auth)}>
          Sign out
        </button>
      </div>
      <div className="border">
        <MainFrame />
      </div>
    </div>
  );
}

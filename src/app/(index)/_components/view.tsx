"use client";

import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("@/features/game/components/main-frame"), { ssr: false });

export function View() {
  return (
    <div className="grid h-full place-content-center">
      <div className="border">
        <MainFrame />
      </div>
    </div>
  );
}

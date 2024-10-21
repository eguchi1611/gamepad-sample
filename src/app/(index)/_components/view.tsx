"use client";

import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("@/features/game/components/main-frame"), { ssr: false });

export function View() {
  return <MainFrame />;
}

"use client";

import { GamepadProvider } from "@/features/gamepad/components/gamepad-provider";
import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return <GamepadProvider>{children}</GamepadProvider>;
}

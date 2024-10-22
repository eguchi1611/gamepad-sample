"use client";

import { InputProvider } from "@/features/gamepad/components/gamepad-provider";
import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return <InputProvider>{children}</InputProvider>;
}

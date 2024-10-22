"use client";

import { InputProvider } from "@/features/input/components/input-provider";
import { Provider } from "jotai";
import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <Provider>
      <InputProvider>{children}</InputProvider>
    </Provider>
  );
}

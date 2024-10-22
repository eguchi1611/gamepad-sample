"use client";

import { AuthProvider } from "@/features/auth/components/auth-provider";
import { InputProvider } from "@/features/input/components/input-provider";
import { Provider } from "jotai";
import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <Provider>
        <InputProvider>{children}</InputProvider>
      </Provider>
    </AuthProvider>
  );
}

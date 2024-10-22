import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export const authContext = createContext<User | null | "error">("error");

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null | "error">("error");

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
}

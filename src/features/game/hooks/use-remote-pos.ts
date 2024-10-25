import { useUser } from "@/features/auth/hooks/use-user";
import { posAtom } from "@/features/global-state/atoms/pos-atom";
import { useRemote } from "@/features/remote/hooks/use-remote";
import { database } from "@/firebase";
import { ref, update } from "firebase/database";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export function useRemotePos() {
  const { remote } = useRemote();
  const { user } = useUser();
  const [initialized, setInitialized] = useState(false);
  const [pos, setPos] = useAtom(posAtom);

  useEffect(() => {
    if (!user || !remote || initialized) return;
    const newPos = remote[user.uid]?.pos;
    if (newPos) setPos(newPos);
    setInitialized(true);
  }, [remote, setPos, user, initialized, setInitialized]);

  useEffect(() => {
    if (!user || !initialized) return;
    update(ref(database, `users/${user.uid}/pos`), pos);
  }, [user, pos, initialized]);
}

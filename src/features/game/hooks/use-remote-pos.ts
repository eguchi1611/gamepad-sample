import { useUser } from "@/features/auth/hooks/use-user";
import { posAtom } from "@/features/global-state/atoms/pos-atom";
import { useRemote } from "@/features/remote/hooks/use-remote";
import { database } from "@/firebase";
import { ref, update } from "firebase/database";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

export function useRemotePos() {
  const { remote } = useRemote();
  const { user } = useUser();
  const initializedRef = useRef(false);
  const [pos, setPos] = useAtom(posAtom);

  useEffect(() => {
    if (!user || !remote || initializedRef.current) return;
    const newPos = remote[user.uid]?.pos;
    if (newPos) setPos(newPos);
    initializedRef.current = true;
  }, [remote, setPos, user]);

  useEffect(() => {
    if (!user || !initializedRef.current) return;
    update(ref(database, `users/${user.uid}/pos`), pos);
  }, [user, pos]);
}

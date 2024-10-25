import { initializedAtom } from "@/features/global-state/atoms/initialized";
import { database } from "@/firebase";
import { onValue, ref } from "firebase/database";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Remote } from "../types/remote";

export function useRemote() {
  const [allData, setAllData] = useState<Remote>();
  const [, setInitialized] = useAtom(initializedAtom);

  useEffect(() => {
    const unsubscribe = onValue(ref(database, "users"), (snapshot) => {
      setAllData(snapshot.val());
      setInitialized(true);
    });
    return () => {
      unsubscribe();
    };
  }, [setInitialized]);

  return { remote: allData };
}

import { database } from "@/firebase";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Remote } from "../types/remote";

export function useRemote() {
  const [allData, setAllData] = useState<Remote>();

  useEffect(() => {
    onValue(ref(database, "users"), (snapshot) => {
      setAllData(snapshot.val());
    });
  }, []);

  return { remote: allData };
}
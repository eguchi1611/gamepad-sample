import { atom } from "jotai";
import { Initialized } from "../types/global-state";

export const initializedAtom = atom<Initialized>(false);

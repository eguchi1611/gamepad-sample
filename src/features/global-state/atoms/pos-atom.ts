import { atom } from "jotai";
import { Position } from "../types/global-state";

export const posAtom = atom<Position>({ x: 0, y: 0 });

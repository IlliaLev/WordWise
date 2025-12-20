"use client";

import {create} from "zustand";
import { persist } from "zustand/middleware";

export type Word = {
    original: string,
    translation: string,
    id: number,
}

interface AppState {
    selectedPage: number,
    setSelectedPage: (page: number) => void,
}

export const useApp = create<AppState>()(persist(
    (set) => ({
        selectedPage: 0,
        setSelectedPage: (page: number) => set(() => ({selectedPage: page})),
    }),
    {
        name: "app-storage",
    }
));

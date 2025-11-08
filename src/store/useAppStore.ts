"use client";

import {create} from "zustand";

export type Word = {
    original: string,
    translation: string,
}

interface AppState {
    words: Word[],
    addWord: (word: Word) => void,
    selectedPage: number,
    setSelectedPage: (page: number) => void,
}

export const useApp = create<AppState>((set) => ({
    words: [],
    addWord: (word: Word) => set((state) => ({words: [...state.words, word]})),
    selectedPage: 0,
    setSelectedPage: (page: number) => set(() => ({selectedPage: page})),
}));

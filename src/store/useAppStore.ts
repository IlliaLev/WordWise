"use client";

import {create} from "zustand";
import { persist } from "zustand/middleware";

export type Word = {
    original: string,
    translation: string,
}

interface AppState {
    words: Word[],
    addWord: (word: Word) => void,
    removeWord: (word: Word) => void,
    updateWord: (index: number, word: Word) => void,
    selectedPage: number,
    setSelectedPage: (page: number) => void,
}

export const useApp = create<AppState>()(persist(
    (set) => ({
        words: [],
        addWord: (word: Word) => set((state) => ({words: [...state.words, word]})),
        removeWord: (word: Word) => set((state) => ({words: state.words.filter(cur => !(
            cur.original === word.original && cur.translation === word.translation
        ))})),
        updateWord: (index: number, word: Word) => set((state) => {
            const newWords = [...state.words];
            newWords[index] = word;
            return {words: newWords}
        }),
        selectedPage: 0,
        setSelectedPage: (page: number) => set(() => ({selectedPage: page})),
    }),
    {
        name: "app-storage",
    }
));

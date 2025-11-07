import {create} from "zustand";

type Word = {
    original: string,
    translation: string,
}

interface AppState {
    words: Word[],
    addWord: (word: Word) => void,
}

export const useApp = create<AppState>((set) => ({
    words: [],
    addWord: (word: Word) => set((state) => ({words: [...state.words, word]})),
}));
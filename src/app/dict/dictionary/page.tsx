"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/store/useAppStore";
import type { Word } from "@/store/useAppStore";

import RippleButton from "@/components/ui/RippleButton";
import ListItem from "@/components/ui/ListItem";
import FlipCard from "@/components/ui/FlipCard";
import ModalWindow from "@/components/ui/ModalWindow";

//! style items in list, add motion.ul?, create search like search all word, only among original and only among translation 
//! (maybe make like 2 checkboxes that acts like filters, alphabetical sort)

export default function DictionaryPage() {
    const {words, addWord, removeWord, updateWord} = useApp();

    const [input_1, setInput1] = useState<string>("");
    const [input_2, setInput2] = useState<string>("");

    const [ishowed1, setIshowed1] = useState<boolean>(false);
    const [ishowed2, setIshowed2] = useState<boolean>(false);

    const [randomWord, setRandomWord] = useState<Word>({original: "Please add words...", translation: "Please add words...", id: -1});
    
    const [editingWord, setEditingWord] = useState<Word | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleEdit = (word: Word, index: number) => {
        setEditingWord({ ...word});
        setEditingIndex(index);
    }

    const handleSave = (updated: Word) => {
        if(editingIndex !== null) {
            updateWord(editingIndex, updated);
        }
        setEditingWord(null);
        setEditingIndex(null);
    }

    const handleAddWord = () => {
        const word: Word = {original: input_1, translation: input_2, id: Date.now()};
        addWord(word);
        setInput1("");
        setInput2("");
        setIshowed1(false);
        setIshowed2(false);
    }

    const getRandomWord = () => {
        if(words.length > 0) {
            const idx = Math.floor(Math.random() * words.length);
            return words[idx];
        } else {
            const word: Word = {original: "Please add words...", translation: "Please add words...", id: -1};
            return word;    
        }
    }

    useEffect(() => {
        setRandomWord(getRandomWord());
    }, [words]);

    return (
        <div className={`
        flex flex-col
        `}>
            <div className={`
                flex flex-row
                ml-20 mt-20 mr-20 mb-20
                justify-between
                `}>
                <div className={`
                    flex flex-col items-center justify-center
                    bg-white/50 
                    w-[60%] min-h-200
                    min-w-60
                    rounded-[40px_15px_40px_15px]
                    backdrop-blur-sm
                    `}>
                        <div className={`
                            m-10
                            w-[90%] h-full 
                            bg-white/30
                            rounded-[40px_15px_40px_15px]
                            p-6
                            overflow-hidden
                            `}>
                            <ul className={`
                                flex  flex-col items-center
                                w-full h-full
                                scrollbar-hide
                                space-y-2
                                `}>
                                {words.map((word: Word, idx) => (
                                    <li key={idx} className={`
                                        flex items-center justify-center
                                        w-full h-5
                                        py-6
                                        text-2xl
                                    
                                    `}>
                                        <ListItem index={idx} word={word} onDelete={() => removeWord(word)} onEdit={() => handleEdit(word, idx)}></ListItem>
                                    </li>
                                ))}
                            </ul>
                        </div>
                </div>
                <div className={`
                    flex flex-col justify-between
                    w-[40%] h-200
                    max-w-83
                    `}>
                        <div className={`
                            flex flex-col justify-between
                            min-h-80
                            `}>
                            <div className={`
                                flex flex-col items-center justify-center
                                w-full h-20
                                bg-white/50
                                rounded-[20px_5px_20px_5px]
                                backdrop-blur-sm
                                `}>
                                    <input className={`
                                        outline-none
                                        w-[80%] h-[60%]
                                        rounded-[20px_5px_0px_0px]
                                        text-center
                                        text-2xl
                                        hover:bg-white/30
                                        focus:bg-white/30
                                        transition duration-300
                                        `} placeholder="Enter original word..." type="text" value={input_1.trim()} onBlur={() => setIshowed1(input_1.trim() !== "" ? true : false)} onFocus={() => setIshowed1(true)} onChange={(e) => setInput1(e.target.value.trim())}/>
                                    <AnimatePresence>
                                        <motion.span className={`
                                            w-[80%] h-0.5
                                            bg-white 
                                            rounded-full
                                        `}
                                        initial={{
                                            scaleX: 0,
                                        }}
                                        animate={{
                                            scaleX: ishowed1 ? 1 : 0,
                                        }}
                                        exit={{
                                            scaleX: 0,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeInOut"
                                        }}>

                                        </motion.span>
                                    </AnimatePresence>
                            </div>
                            <div className={`
                                flex flex-col items-center justify-center
                                w-full h-20
                                bg-white/50
                                rounded-[20px_5px_20px_5px]
                                backdrop-blur-sm
                                `}>
                                    <input className={`
                                        outline-none
                                        w-[80%] h-[60%]
                                        rounded-[20px_5px_0px_0px]
                                        text-center
                                        text-2xl
                                        hover:bg-white/30 
                                        focus:bg-white/30
                                        transition duration-300
                                        `} placeholder="Enter translation..." type="text" value={input_2.trim()} onBlur={() => setIshowed2(input_2.trim() !== "" ? true : false)} onFocus={() => setIshowed2(true)} onChange={(e) => setInput2(e.target.value.trim())}/>
                                    <AnimatePresence>
                                        <motion.span className={`
                                            w-[80%] h-0.5
                                            bg-white 
                                            rounded-full
                                        `}
                                        initial={{
                                            scaleX: 0,
                                        }}
                                        animate={{
                                            scaleX: ishowed2 ? 1 : 0,
                                        }}
                                        exit={{
                                            scaleX: 0,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeInOut"
                                        }}>

                                        </motion.span>
                                    </AnimatePresence>
                            </div>
                            <div className={`
                            
                                `}>
                                <RippleButton className={`
                                    w-full h-20
                                    ${(input_1.trim() !== "" && input_2.trim() !== "") ? "bg-[#00F58B]/50" : "bg-[#00A35C]/50"}
                                    ${(input_1.trim() !== "" && input_2.trim() !== "") ? "active-button" : "banned-button"}
                                    rounded-[20px_5px_20px_5px]
                                    backdrop-blur-sm
                                    transition duration-300
                                    text-white text-center text-2xl
                                    outline-none
                                    `} onClick={handleAddWord} active={(input_1.trim() !== "" && input_2.trim() !== "")}>
                                    Add Word
                                </RippleButton>
                            </div>
                            

                        </div>
                        <div className={`
                            flex items-center justify-center
                            w-full h-80
                            bg-white/50
                            rounded-[40px_15px_40px_15px]
                            backdrop-blur-sm
                        `}>
                                <FlipCard front={randomWord.original} back={randomWord.translation} bgClassName=" w-[90%] h-[90%]" className={`
                                    bg-white/30
                                    rounded-[40px_15px_40px_15px]
                                    text-3xl
                                    font-semibold
                                `}>

                                </FlipCard>
                            
                        </div>
                </div> 
            </div>
            <ModalWindow word={editingWord} onClose={() => setEditingWord(null)} onSave={handleSave}>

            </ModalWindow>
        </div>
    );
}
"use client";

import { useState, useEffect, useMemo, useCallback, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/store/useAppStore";
import type { Word } from "@/store/useAppStore";
import { Search } from "lucide-react";
import useWindowSize from "@/hooks/useWindowSize";

import RippleButton from "@/components/ui/RippleButton";
import ListItem from "@/components/ui/ListItem";
import FlipCard from "@/components/ui/FlipCard";
import ModalWindow from "@/components/ui/ModalWindow";
import Checkbox from "@/components/ui/Checkbox";

import { getWords, createWord, updateWord, deleteWord } from "@/app/actions/words";

export default function DictionaryPage() {
    const [words, setWords] = useState<Word[]>([]);

    const getAllWords = useCallback(async () => {
        setWords(await getWords());
    }, []);

    useEffect(() => {
        getAllWords();
    }, [getAllWords]);

    const [input_1, setInput1] = useState<string>("");
    const [input_2, setInput2] = useState<string>("");

    const [ishowed1, setIshowed1] = useState<boolean>(false);
    const [ishowed2, setIshowed2] = useState<boolean>(false);
    const [ishowed3, setIshowed3] = useState<boolean>(false);

    const [randomWord, setRandomWord] = useState<Word>({original: "Please add words...", translation: "Please add words...", id: -1});
    
    const [editingWord, setEditingWord] = useState<Word | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const [searchWord, setSearchWord] = useState<string>("");

    const [onlyOriginal, setOnlyOriginal] = useState<boolean>(true);
    const [onlyTranslation, setOnlyTranslation] = useState<boolean>(false);

    const [mounted, setMounted] = useState(false);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setMounted(true);
    }, []);

    const {width, height} = useWindowSize();

    const handleEdit = (word: Word, index: number) => {
        setEditingWord({ ...word});
        setEditingIndex(index);
    }

    const handleSave = (updated: Word) => {
        if(!editingWord) return;
        
        startTransition(async () => {
            await updateWord(updated.id, updated.original, updated.translation);
            await getAllWords();
        })

        setEditingWord(null);
    }

    const handleAddWord = () => {
        startTransition(async () => {
            await createWord(input_1, input_2);
            await getAllWords();
        });

        setInput1("");
        setInput2("");
        setIshowed1(false);
        setIshowed2(false);
    }

    const handleSearch = (inputSearchWord: string) => {
        setSearchWord(inputSearchWord);
    }

    const handleOnlyOriginal = () => {
        if(onlyOriginal && !onlyTranslation) {
            setOnlyOriginal(true);
        } else {
            setOnlyOriginal(!onlyOriginal);
        }
    }

    const handleOnlyTranslation = () => {
        if(onlyTranslation && !onlyOriginal) {
            setOnlyTranslation(true);
        } else {
            setOnlyTranslation(!onlyTranslation);
        }
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

    const filteredWords = useMemo(() => {
        if(onlyOriginal && !onlyTranslation) {
            return words.filter((w) => 
                w.original.toLowerCase().includes(searchWord.toLowerCase())
            );
        } else if(!onlyOriginal && onlyTranslation) {
            return words.filter((w) => 
                w.translation.toLowerCase().includes(searchWord.toLowerCase())
            );
        }
        return words.filter((w) => 
            w.original.toLowerCase().includes(searchWord.toLowerCase()) ||
            w.translation.toLowerCase().includes(searchWord.toLowerCase())
        )
    }, [searchWord, words, onlyOriginal, onlyTranslation]);

    return (
        <div className={`
        flex flex-col
        `}>
            <div className={`
                flex md:flex-row flex-col gap-3
                mt-20 mb-20
                md:ml-7 md:mr-7
                lg:ml-20 lg:mr-20
                ml-5 mr-5
                justify-between
                `}>
                <div className={`
                    flex flex-col items-center justify-center
                    bg-white/50 
                    w-full
                    md:w-[60%] md:min-h-200 
                    min-w-60
                    rounded-[40px_15px_40px_15px]
                    backdrop-blur-sm
                    `}>
                        <div className={`
                            mt-10 ml-10 mr-10
                            w-[90%] 
                            ${width >= 1340 ? "h-20" : "h-25 md:h-30"}
                            bg-white/30
                            overflow-hidden
                            rounded-[40px_15px_0_0]
                            border-b-2 border-b-white
                        `}>
                            <div className={`
                                mt-4 mx-1.5
                                flex 
                                
                                ${width >= 1340 ? `
                                        flex-row items-center gap-6 justify-between mb-4
                                    ` : `
                                        flex-col justify-center gap-2
                                    `}
                                
                            `}>
                                <div className={`
                                    flex 
                                    flex-row items-center gap-3
                                    
                                `}>
                                    <Search className={`
                                        ml-3 md:ml-0
                                        
                                        
                                    `} size={width <= 768 ? 35 : 25}/>
                                    <div className={`
                                        flex flex-col items-center justify-center 
                                        mr-5 md:mr-0
                                    `}>
                                        
                                        <input type="text" placeholder="Find word" onFocus={() => setIshowed3(true)} onBlur={() => setIshowed3(searchWord.trim() !== "" ? true : false)} value={searchWord} onChange={(e) => handleSearch(e.target.value)} className={`
                                            outline-none text-2xl
                                            w-full md:w-auto
                                            
                                            
                                            border-l-2 border-l-white px-3
                                        `}/>
                                        <AnimatePresence>
                                            <motion.span className={`
                                                bg-white
                                                w-full h-0.5  
                                                rounded-full
                                                ml-6
                                            `} initial={{
                                                scaleX: 0,
                                            }} animate={{
                                                scaleX: ishowed3 ? 1 : 0,
                                            }} exit={{
                                                scaleX: 0,
                                            }} transition={{
                                                duration: 0.4,
                                                ease: "easeInOut",
                                            }}>

                                            </motion.span>
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <div className={`
                                    flex flex-row gap-3 
                                    text-xl font-semibold
                                    
                                `}>
                                    <Checkbox checked={onlyOriginal} onChange={handleOnlyOriginal} label="Originals"></Checkbox>
                                    <Checkbox checked={onlyTranslation} onChange={handleOnlyTranslation} label="Translations"></Checkbox>
                                </div>
                            </div>
                        </div>
                        <div className={`
                            mb-10
                            w-[90%] h-full
                            bg-white/30
                            rounded-[0_0_40px_15px]
                            p-6
                            overflow-hidden
                            `}>
                            <ul className={`
                                flex  flex-col items-center
                                w-full h-full
                                scrollbar-hide
                                space-y-2
                                `}>
                                {(searchWord.trim() === "" ? words : filteredWords).map((w) => (
                                    <li key={w.id} className={`
                                        flex items-center justify-center
                                        w-full h-5
                                        py-6
                                        text-2xl
                                    
                                    `}>
                                        <ListItem index={w.id} word={w} onDelete={() => startTransition(async () => {
                                            await deleteWord(w.id);
                                            await getAllWords();
                                        })} onEdit={() => handleEdit(w, w.id)}></ListItem>
                                    </li>
                                ))}
                            </ul>
                        </div>
                </div>
                <div className={`
                    flex flex-col justify-between 
                    mt-20 md:mt-0
                    w-full items-center 
                    md:w-[40%] h-200
                    md:max-w-83
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
                                        `} placeholder="Enter original word..." type="text" value={input_1} onBlur={() => setIshowed1(input_1.trim() !== "" ? true : false)} onFocus={() => setIshowed1(true)} onChange={(e) => setInput1(e.target.value)}/>
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
                                        `} placeholder="Enter translation..." type="text" value={input_2} onBlur={() => setIshowed2(input_2.trim() !== "" ? true : false)} onFocus={() => setIshowed2(true)} onChange={(e) => setInput2(e.target.value)}/>
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
                            md:w-full
                            w-80 h-80
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
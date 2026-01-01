"use client";

import { type Word } from "@/store/useAppStore";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import FlipCard from "./FlipCard";
import { ChevronLeft, ChevronRight, Shuffle, ArrowRightLeft } from "lucide-react";
import { getWords } from "@/app/actions/words";
import { randomPermutation } from "@/lib/array/randomPermutation";

const cardVariants: Variants = {
    initial: direction => {
        return {
            x: direction > 0 ? 200 : -200,
            scale: 0.9,
            opacity: 0,
        }
    },
    animate: {
        x: 0,
        scale: 1,
        opacity: 1,
        transition: {
            ease: "easeIn",
        }
    },
    exit: direction => {
        return {
            x: direction > 0 ? -200 : 200,
            scale: 0.9,
            opacity: 0,
        }
    }
}

export default function CardCarousel() {
    const [words, setWords] = useState<Word[]>([]);

    const [isOriginal, setIsOriginal] = useState(true);

    const getAllWords = useCallback(async () => {
        setWords(await getWords());
    }, []);

    useEffect(() => {
        getAllWords();
    }, [getAllWords]);

    const [idx, setIdx] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextCard = () => {
        setDirection(1);
        if(idx === words.length - 1) {
            setIdx(0);
            return;
        }
        setIdx(idx + 1);
    }
    
    const prevCard = () => {
        setDirection(-1);
        if(idx === 0) {
            setIdx(words.length - 1);
            return;
        }
        setIdx(idx - 1);
    }

    const handleShuffle = () => {
        setWords(randomPermutation(words));
    }

    const handleOriginalChange = () => {
        setIsOriginal((prev) => !prev);
    }

    /*if(words.length === 0) {
        return (
            <div className={`
                flex items-center justify-center
                w-full h-full
                bg-white/50
                backdrop-blur-sm
                rounded-[40px_15px_40px_15px]
                text-3xl

            `}> 
                No words yet 
            </div>
        );
    }*/

    return (
        <main className="w-full h-full">
            <div className={`
                relative
                overflow-hidden
                w-full h-full
                bg-white/50
                backdrop-blur-sm
                rounded-[40px_15px_40px_15px]
                border-2 border-[#1E1E1E]
                drop-shadow-md drop-shadow-black
            `}>
                <button className={`
                    absolute 
                    top-1/2 -translate-y-1/2
                    left-2
                    bg-[#1E1E1E] border border-[#3D3D3D]
                    hover:bg-[#3D3D3D]
                    focus:bg-[#3D3D3D]
                    text-white   
                    rounded-full  
                    z-999
                    transition duration-300
                `} onClick={prevCard}>
                    <ChevronLeft className={`
                        w-8 h-8  
                    `}></ChevronLeft>
                </button>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div className={`
                        absolute
                        top-1/2 left-1/2
                        -translate-x-1/2 -translate-y-1/2
                        w-[80%] h-[80%]
                    
                    `} variants={cardVariants} initial="initial" animate="animate" exit="exit" custom={direction} key={idx}>

                        <FlipCard isOriginal={isOriginal} front={words.length !== 0 ? words[idx].original : "Please Create Words"} back={words.length !== 0 ? words[idx].translation : "Still no words"} bgClassName="w-full h-full" className={`
                            bg-white/30
                            text-2xl
                        
                            font-semibold
                            rounded-[40px_15px_40px_15px]
                            select-none
                        `}></FlipCard>
                    </motion.div>
                </AnimatePresence>
                <button className={`
                    absolute 
                    top-1/2 -translate-y-1/2
                    right-2 
                    bg-[#1E1E1E] border border-[#3D3D3D]
                    hover:bg-[#3D3D3D]
                    focus:bg-[#3D3D3D]
                    text-white   
                    rounded-full
                    z-999
                    transition duration-300
                `} onClick={nextCard}>
                    <ChevronRight className={`
                        w-8 h-8    
                    `}></ChevronRight>
                </button>
            </div>
            <div className={`
                flex flex-row justify-end
                w-full h-10
                mt-7
                bg-white/50  
                backdrop-blur-sm
                rounded-[20px_5px_20px_5px]
                border-2 border-[#1E1E1E]
                drop-shadow-md drop-shadow-black
                space-x-1.5
            `}>
                <button className={`
                    mr-3 active-button
                    hover:text-white
                    transition duration-300
                `} onClick={handleOriginalChange}>
                    <ArrowRightLeft></ArrowRightLeft>
                </button>
                <button className={`
                    mr-3 active-button
                    hover:text-white
                    transition duration-300
                `} onClick={handleShuffle}>
                    <Shuffle></Shuffle>
                </button>
            </div>
        </main>
    );
}
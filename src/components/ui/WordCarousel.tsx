"use client";

import { useState, useMemo } from "react";
import {motion, AnimatePresence} from "framer-motion";
import { useApp } from "@/store/useAppStore";
import FlipCard from "./FlipCard";

export default function WordCarousel() {
    const {words} = useApp();
    const [index, setIndex] = useState(0);

    const visibleWords = useMemo(() => {
        if(words.length === 0) return [];

        const total = words.length;
        const prev = (index - 1 + total) % total;
        const next = (index + 1) % total;
        
        return [words[prev], words[index], words[next]];
    }, [index, words]);

    if(words.length === 0) {
        return (
            <div>No words yet...</div>
        );
    }

    return (
        <div className={`
            
        `}>
            <button onClick={() => setIndex((i) => (i - 1 + words.length) % words.length)}>
                show prev
            </button>
            <div className={`
                relative  items-center justify-center w-full
            `}>
                <AnimatePresence mode="popLayout">
                    {visibleWords.map((word, idx) => {
                        const isCenter = idx === 1;
                        const offset = (idx - 1) * 220;

                        return (
                            <motion.div key={word.original + idx} 
                                initial={{ 
                                    x: offset,
                                }}
                                animate={{     
                                    x: offset,
                                }} 
                                transition={{
                                    duration: 0.4,
                                }} className={`
                                    absolute
                                `}>
                                    <FlipCard front={word.original} back={word.translation} bgClassName="w-44 h-44" className={`
                                        bg-white/30
                                        rounded-[40px_15px_40px_15px]
                                        text-3xl font-semibold
                                    
                                    `}>

                                    </FlipCard>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
            <button onClick={() => setIndex((i) => (i + 1) % words.length)}>
                    show next
            </button>
        </div>
    );
}
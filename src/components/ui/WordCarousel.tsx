"use client";

import { useState, useMemo } from "react";
import {motion, AnimatePresence} from "framer-motion";
import { useApp } from "@/store/useAppStore";
import FlipCard from "./FlipCard";

export default function WordCarousel() {
    const {words} = useApp();
    const [idx, setIdx] = useState(0);

    const nextIdx = () => {
        if(idx === words.length - 1) {
            setIdx(0);
            return;
        }
        setIdx(idx + 1);
    }

    const prevIdx = () => {
        if(idx === 0) {
            setIdx(words.length - 1);
            return;
        }
        setIdx(idx - 1);
    }

    return (
        <div className={`
            flex items-center justify-center gap-3
            w-[85%] h-[85%]
            overflow-hidden
            bg-white/50
            rounded-[40px_15px_40px_15px]
            backdrop-blur-sm
            p-5
        `}>
            <button className={`
                bg-black 
                aspect-square
                min-w-8 w-full max-w-16
                rounded-full
                
            `} onClick={prevIdx}>-</button>
            <AnimatePresence initial={false}>
                <motion.div className={`
                     min-h-[80%]
                     h-[80%]
                    aspect-square
                `} initial={{
                    x: 0,
                    opacity: 0,
                }} animate={{
                    x: 0,
                    opacity: 1,
                }} exit={{
                    x: -200,
                    opacity: 0,
                }} key={idx}>
                    <FlipCard front={words[idx].original} back={words[idx].translation} bgClassName="w-full h-full" className={`
                        bg-white/30
                        text-2xl
                        font-semibold
                        rounded-[40px_15px_40px_15px]
                    `}></FlipCard>
                </motion.div>
            </AnimatePresence>

            <button className={`
                bg-black
                aspect-square
                min-w-8 w-full max-w-16
                rounded-full
                
            `} onClick={nextIdx}>+</button>
        </div>
    );
}
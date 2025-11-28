"use client";

import { useApp } from "@/store/useAppStore";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import FlipCard from "./FlipCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    const {words} = useApp();
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

    if(words.length === 0) {
        return (
            <div>No words yet</div>
        );
    }

    return (
        <div className={`
            relative
            overflow-hidden
            w-full h-full
            bg-white/50
            backdrop-blur-sm
            rounded-[40px_15px_40px_15px]
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
                    <FlipCard front={words[idx].original} back={words[idx].translation} bgClassName="w-full h-full" className={`
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
    );
}
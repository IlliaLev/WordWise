"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FlipCardProps {
    front: string,
    back: string,
    size?: string,
    bgClassName?: string,
    className: string,
    bg?: string,
    isOriginal: boolean,
}

export default function FlipCard({front, back, bgClassName, className, bg, isOriginal} : FlipCardProps) {
    const [flipped, setFlipped] = useState(false);

  return (
      <div
        className={`
            relative ${bgClassName} bg-none perspective-[1000px] flip-card
        `}
        onClick={() => setFlipped((prev) => !prev)}
      >
        <motion.div className={`
            relative w-full h-full
          `} style={{
            transformStyle: "preserve-3d"
          }} animate={{
            rotateY: flipped ? 180 : 0,
          }} transition={{
            duration: 0.6,
            ease: "easeInOut",
          }} 
        layout>
          <div
            className={`
              ${className}
              absolute w-full h-full 
              flex items-center justify-center 
              backface-hidden
              `}
          >
            <div className="px-4 text-center wrap-anywhere whitespace-normal">
              {isOriginal ? <>{front}</> : <>{back}</>}
            </div>
          </div>

          <div
            className={`
              ${className}
              absolute w-full h-full
              flex items-center justify-center 
              backface-hidden
              transform-[rotateY(180deg)]
              text-center wrap-break-word whitespace-normal
              `}
          >
            <div className="px-4 text-center wrap-anywhere whitespace-normal">
              {isOriginal ? <>{back}</> : <>{front}</>}
            </div>
          </div>
        </motion.div>
      </div>
  );
}
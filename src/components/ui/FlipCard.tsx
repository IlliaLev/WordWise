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
}

export default function FlipCard({front, back, bgClassName, className, bg} : FlipCardProps) {
    const [flipped, setFlipped] = useState(false);

  return (
      <div
        className={`
            relative ${bgClassName} bg-none perspective-[1000px] flip-card
        `}
        onClick={() => setFlipped((prev) => !prev)}
      >
        <motion.div
          className={`
            ${className}
            absolute w-full h-full 
            flex items-center justify-center 
            backface-hidden
            `}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {front}
        </motion.div>

        <motion.div
          className={`
            ${className}
            absolute w-full h-full 
            flex items-center justify-center 
            backface-hidden
            transform-[rotateY(180deg)]
            `}
          animate={{ rotateY: flipped ? 360 : 180 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {back}
        </motion.div>
      </div>
  );
}
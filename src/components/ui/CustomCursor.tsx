"use client";

import { useState, useEffect } from "react";
import { MousePointer2, Circle } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [pos, setPos] = useState({x: 0, y: 0});

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            setPos({x: e.clientX, y: e.clientY});
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        /*<MousePointer2 className={`
            fixed pointer-events-none z-9999 text-black transition duration-75
        `} style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-10%, -10%) scale(1.1)",
        }}>

        </MousePointer2>*/
        /*<motion.div className={`
           fixed pointer-events-none z-9999 text-white
        `} animate={{
            x: pos.x,
            y: pos.y,
        }} transition={{
            type: "spring", stiffness: 800, damping: 25,
        }}>
            <Circle className={`
                w-6 h-6
                `}></Circle>
        </motion.div>*/
        <div></div>
    );
}
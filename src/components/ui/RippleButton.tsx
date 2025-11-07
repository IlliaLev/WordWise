import React, {useState} from "react";

import { motion } from "framer-motion";

interface Ripple {
    id: number,
    x: number,
    y: number, 
    size: number,
}

interface RippleButtonProps {
    children: React.ReactNode,
    className?: string,
    active: boolean,
    onClick: () => void,
}

export default function RippleButton({children, className, onClick, active} : RippleButtonProps) {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(!active) return;
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();

        const size = Math.min(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const newRipple: Ripple = {id: Date.now(), x, y, size};
        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 900);

        onClick?.();
    };

    return (
        <button className={`
            relative overflow-hidden select-none ${className}
        `} onClick={createRipple} >
            {ripples.map((ripple) => (
                <motion.span key={ripple.id} className={`
                    absolute bg-white/40 rounded-full
                `} style={{
                    left: ripple.x - 10,
                    top: ripple.y - 10,
                    width: ripple.size,
                    height: ripple.size,
                }}
                initial={{
                    scale: 0, opacity: 0.5,
                }}
                animate={{
                    scale: 10, opacity: 0,
                }}
                transition={{
                    duration: 0.9, ease: "easeOut",
                }}>

                </motion.span>
            ))}
            {children}
        </button>
    );
}
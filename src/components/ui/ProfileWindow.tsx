"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useRef, useEffect } from "react"

interface ProfileWindowProps {
    children: React.ReactNode,
    className?: string,
    isVisible: boolean,
    onClose: () => void,
}

export default function ProfileWindow({ children, className, isVisible, onClose } : ProfileWindowProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(!isVisible) return;

        const handleClickOutside = (e: MouseEvent) => {
            if(ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div ref={ref} className={`
                    ${className}
            
                    absolute
                    right-0 top-12
                    z-9999
                `} initial={{
                    opacity: 0,
                    y: -5,
                }} animate={{
                    opacity: 1,
                    y: 0,
                }} exit={{
                    opacity: 0,
                    y: -5,
                }}>
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
        
    );
}
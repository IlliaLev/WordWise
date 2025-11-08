"use client";

import { useEffect, useState } from "react";
import { ArrowBigUpDash } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

export default function ScrollToTopButton() {
    const controls = useAnimation();
    const [visible, setVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if(window.scrollY > 200) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        }
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    },[]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        const bounce = () => {
            controls.start({
                y: [0, -8, 0],
                transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                }
            });
        };

        if(isHovered) {
            bounce();

            interval = setInterval(bounce, 500);
        }
        else {
            controls.start({y: 0});
            if(interval) clearInterval(interval);
        }
        return () => {
            if(interval) {
                clearInterval(interval);
            }
        }
    }, [isHovered, controls]);

    return (
        <button onClick={scrollToTop} className={`
            scroll-to-top-btn
            fixed bottom-10 right-10 z-50 
            rounded-full 
            p-3
            transition duration-300 
            bg-[#1E1E1E] border border-[#3D3D3D]
            text-white
            ${visible ? "scale-100 opacity-100" : "scale-0 opacity-0"}
        `} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <motion.div animate={controls}>
                <ArrowBigUpDash className={`
                    w-8 h-8 
                    `}>

                </ArrowBigUpDash>
            </motion.div>
        </button>
    );
}
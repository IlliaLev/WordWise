"use client";

import type { Word } from "@/store/useAppStore";
import { motion, AnimatePresence} from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import RippleButton from "./RippleButton";

interface ModalWindowProps {
    word: Word | null,
    onClose: () => void,
    onSave: (newWord: Word) => void,
}

export default function ModalWindow({word, onClose, onSave} : ModalWindowProps) {
    const [editedWord, setEditedWord] = useState<Word>({original: "", translation: "", id: Date.now()});

    const [ishowed1, setIshowed1] = useState<boolean>(true);
    const [ishowed2, setIshowed2] = useState<boolean>(true);

    useEffect(() => {
        if(word) setEditedWord(word);
    },[word]);

    useEffect(() => {
        if(word) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [word]);

    if(!word) return null;

    return (
        <AnimatePresence>
            {word && (
                <>
                    <motion.div className={`
                        fixed inset-0 bg-black/60 backdrop-blur-sm z-40    
                    `} initial={{
                        opacity: 0,
                    }} animate={{
                        opacity: 1,
                    }} exit={{
                        opacity: 0,
                    }} transition={{
                        duration: 0.3,
                        ease: "easeOut",
                    }} onClick={onClose}>

                    </motion.div>

                    <motion.div className={`
                        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                        flex items-center justify-center
                        
                    `} initial={{
                        opacity: 0,
                    }} animate={{
                        opacity: 1,
                        
                    }} exit={{
                        opacity: 0,
                    }}>
                        <motion.div className={`
                            flex flex-col
                            bg-white/50  
                            w-80 h-70
                            md:w-120 md:h-80
                            rounded-[40px_15px_40px_15px]
                            p-5
                        `} initial={{
                            opacity: 0,
                            y: 60,
                            scale: 0.9,
                        }} animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }} exit={{
                            opacity: 0,
                            y: 40,
                            scale: 0.95,
                        }}>
                            <div className={`
                                flex flex-row items-center justify-between
                                border-b-2 border-b-white
                            `}>
                                <h2 className={`
                                    text-2xl font-semibold select-none
                                `}>Edit Word</h2>
                                <button className={`
                                    active-button
                                    
                                `} onClick={onClose}>
                                    <motion.div initial={{
                                        rotate: 0,
                                    }} whileHover={{
                                        rotate: 90,
                                        color: "#ffffff",
                                    }} transition={{
                                        duration: 0.3,
                                    }} className={`
    
                                    `}>
                                        <X></X>
                                    </motion.div>
                                </button>
                            </div>
                            <div className={`
                                flex flex-col items-center 
                                w-full h-full
                                mt-5 gap-4
                            `}>
                                <div className={`
                                    flex flex-col items-center justify-center
                                `}>
                                    <input type="text" placeholder="Original" className={`
                                        w-[80%] text-xl p-1 text-center outline-none
                                        rounded-[20px_5px_0px_0px]
                                        hover:bg-white/30 
                                        focus:bg-white/30
                                        transition duration-300
                                    `} value={editedWord.original} onFocus={() => setIshowed1(true)} onBlur={(e) => setIshowed1(e.target.value.trim() !== "" ? true : false)} onChange={(e) => setEditedWord({...editedWord, original: e.target.value})}/>
                                    <AnimatePresence>
                                        <motion.span className={`
                                            bg-white
                                            w-[80%] h-0.5
                                            rounded-full  
                                        `} initial={{
                                            scaleX: 0,
                                        }} animate={{
                                            scaleX: ishowed1 ? 1 : 0,
                                        }} exit={{
                                            scaleX: 0,
                                        }} transition={{
                                            duration: 0.5,
                                            ease: "easeInOut",
                                        }}>

                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                
                                <div className={`
                                    flex flex-col  items-center justify-center
                                    mb-12
                                `}>
                                    <input type="text" placeholder="Translation" className={`
                                        w-[80%] text-xl p-1 text-center outline-none
                                        rounded-[20px_5px_0px_0px]
                                        hover:bg-white/30 
                                        focus:bg-white/30
                                        transition duration-300
                                    `} value={editedWord.translation} onFocus={() => setIshowed2(true)} onBlur={(e) => setIshowed2(e.target.value.trim() !== "" ? true : false)} onChange={(e) => setEditedWord({...editedWord, translation: e.target.value})}/>
                                    <AnimatePresence>
                                        <motion.span className={`
                                            w-[80%] h-0.5
                                            bg-white
                                            rounded-full  
                                        `} initial={{
                                            scaleX: 0,
                                        }} animate={{
                                            scaleX: ishowed2 ? 1 : 0,
                                        }} exit={{
                                            scaleX: 0,
                                        }} transition={{
                                            duration: 0.5,
                                            ease: "easeInOut",
                                        }}>

                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                
                                <RippleButton active={editedWord.original.trim() !== "" && editedWord.translation.trim() !== ""} onClick={() => onSave(editedWord)} className={`
                                    w-[60%] h-[20%]
                                    ${editedWord.original.trim() !== "" && editedWord.translation.trim() !== "" ? "bg-[#00F58B]/50" : "bg-[#00A35C]/50"}
                                    ${editedWord.original.trim() !== "" && editedWord.translation.trim() !== "" ? "active-button" : "banned-button"}
                                    rounded-[20px_5px_20px_5px]
                                    backdrop-blur-sm
                                    transition duration-300
                                    text-white text-center text-2xl
                                    outline-none
                                `}>
                                    Save Changes
                                </RippleButton>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
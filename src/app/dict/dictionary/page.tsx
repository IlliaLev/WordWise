"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import RippleButton from "@/components/ui/RippleButton";

//! Add when i add the new word it clears both of the input fields

export default function DictionaryPage() {
    const [input_1, setInput1] = useState<string>("");
    const [input_2, setInput2] = useState<string>("");

    const [ishowed1, setIshowed1] = useState<boolean>(false);
    const [ishowed2, setIshowed2] = useState<boolean>(false);

    return (
        <div className={`
        flex flex-col
        `}>
            <div className={`
                flex flex-row
                ml-20 mt-20 mr-20
                justify-between
                `}>
                <div className={`
                    bg-white/50 
                    w-[40%] h-60 
                    rounded-[40px_15px_40px_15px]
                    backdrop-blur-sm
                    `}>

                </div>
                <div className={`
                    flex flex-col gap-5
                    w-[40%] h-60
                    `}>
                        <div className={`
                            flex flex-col items-center justify-center
                            w-full h-15
                            bg-white/50
                            rounded-[20px_5px_20px_5px]
                            backdrop-blur-sm
                            `}>
                                <input className={`
                                    outline-none
                                    w-[80%] h-[60%]
                                    rounded-[20px_5px_0px_0px]
                                    text-center
                                    text-2xl
                                    hover:bg-white/30
                                    focus:bg-white/30
                                    transition duration-300
                                    `} type="text" value={input_1.trim()} onBlur={() => setIshowed1(input_1.trim() !== "" ? true : false)} onFocus={() => setIshowed1(true)} onChange={(e) => setInput1(e.target.value.trim())}/>
                                <AnimatePresence>
                                    <motion.span className={`
                                        w-[80%] h-0.5
                                        bg-white 
                                        rounded-full
                                    `}
                                    initial={{
                                        scaleX: 0,
                                    }}
                                    animate={{
                                        scaleX: ishowed1 ? 1 : 0,
                                    }}
                                    exit={{
                                        scaleX: 0,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut"
                                    }}>

                                    </motion.span>
                                </AnimatePresence>
                        </div>
                        <div className={`
                            flex flex-col items-center justify-center
                            w-full h-15
                            bg-white/50
                            rounded-[20px_5px_20px_5px]
                            backdrop-blur-sm
                            `}>
                                <input className={`
                                    outline-none
                                    w-[80%] h-[60%]
                                    rounded-[20px_5px_0px_0px]
                                    text-center
                                    text-2xl
                                    hover:bg-white/30 
                                    focus:bg-white/30
                                    transition duration-300
                                    `} type="text" value={input_2.trim()} onBlur={() => setIshowed2(input_2.trim() !== "" ? true : false)} onFocus={() => setIshowed2(true)} onChange={(e) => setInput2(e.target.value.trim())}/>
                                <AnimatePresence>
                                    <motion.span className={`
                                        w-[80%] h-0.5
                                        bg-white 
                                        rounded-full
                                    `}
                                    initial={{
                                        scaleX: 0,
                                    }}
                                    animate={{
                                        scaleX: ishowed2 ? 1 : 0,
                                    }}
                                    exit={{
                                        scaleX: 0,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut"
                                    }}>

                                    </motion.span>
                                </AnimatePresence>
                        </div>
                        <div className={`
                            
                            `}>
                            <RippleButton className={`
                                w-full h-15
                                ${(input_1.trim() !== "" && input_2.trim() !== "") ? "bg-[#00F58B]/50 active" : "bg-[#00A35C]/50"}
                                rounded-[20px_5px_20px_5px]
                                backdrop-blur-sm
                                transition duration-300
                                text-white text-center text-2xl
                                `} onClick={() => console.log("hello")} active={(input_1.trim() !== "" && input_2.trim() !== "")}>
                                Add Word
                            </RippleButton>
                        </div>
                </div>
            </div>
        </div>
    );
}
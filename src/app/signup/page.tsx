"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import RippleButton from "@/components/ui/RippleButton";
import { signup } from "./action";

export default function signupPage() {
    const router = useRouter();

    const [isEmail, setIsEmail] = useState(false);
    const [email, setEmail] = useState("");

    const [isPassword, setIsPassword] = useState(false);
    const [password, setPassword] = useState("");

    const [isPending, startTransition] = useTransition();

    return (
        <div className={`
            min-h-screen flex flex-col items-center justify-center
            bg-[#141414] bg-triangles overflow-hidden
        `}>
            <div className={`
                flex items-center justify-center
                w-80 h-110
                md:w-120 md:h-150  
                bg-white/50
                rounded-[40px_15px_40px_15px]
                backdrop-blur-sm
            `}>
                <main className={`
                    flex flex-col items-center
                    w-70 h-100
                    md:w-110 md:h-140
                    bg-white/30
                    rounded-[40px_15px_40px_15px]
                `}>
                    <div className={`
                        w-full  
                        mt-5
                        md:mt-10 
                        mx-10
                    `}>
                        <h1 className={`
                            text-center 
                            font-bold 
                            text-2xl
                            md:text-3xl  
                            select-none
                        `}>Let's Get Started</h1>
                    </div>
                    <div className={`
                       w-60 
                       md:w-100
                       mt-7
                       md:mt-15 
                    `}>
                        <h2 className={`
                            font-semibold 
                            text-xl
                            md:text-2xl 
                            select-none  
                        `}>E-mail</h2>
                        <div className={`
                            flex flex-col justify-center
                            w-full h-12 
                        `}>
                            <input id="email" type="text" placeholder="Enter your e-mail" className={`
                                outline-none w-full select-none px-2
                            `} value={email} onBlur={() => setIsEmail(email.trim() !== "" ? true : false)} onFocus={() => setIsEmail(true)} onChange={(e) => setEmail(e.target.value)}/>

                            <AnimatePresence>
                                <motion.span className={`
                                    bg-white
                                    w-full h-0.5
                                    rounded-full  
                                `} initial={{
                                    scaleX: 0,
                                }} animate={{
                                    scaleX: isEmail ? 1 : 0,
                                }} exit={{
                                    scaleX: 0,
                                }} transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }}>

                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <h2 className={`
                            font-semibold 
                            text-xl
                            md:text-2xl 
                            select-none mt-7
                        `}>Password</h2>
                        <div className={`
                            flex flex-col justify-center
                            w-full h-12 
                        `}>
                            <input id="password" type="password" placeholder="••••••••" className={`
                                outline-none w-full select-none px-2
                            `} value={password} onBlur={() => setIsPassword(password.trim() !== "" ? true : false)} onFocus={() => setIsPassword(true)} onChange={(e) => setPassword(e.target.value)}/>

                            <AnimatePresence>
                                <motion.span className={`
                                    bg-white
                                    w-full h-0.5
                                    rounded-full  
                                `} initial={{
                                    scaleX: 0,
                                }} animate={{
                                    scaleX: isPassword ? 1 : 0,
                                }} exit={{
                                    scaleX: 0,
                                }} transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }}>

                                </motion.span>
                            </AnimatePresence>
                        </div>
                        <div className={`
                            flex flex-col items-center justify-center 
                            mt-5
                            md:mt-20 
                            mb-5
                            md:mb-10 
                        `}>
                            <RippleButton active={!isPending} onClick={() => startTransition(async () => {
                                await signup(email, password);
                                router.push("/dict/dictionary");
                            })} className={`
                                w-45
                                md:w-70 
                                h-10
                                md:h-15
                                ${(email.trim() !== "" && password.trim() !== "") ? "bg-[#00F58B]/50" : "bg-[#00A35C]/50"}
                                ${(email.trim() !== "" && password.trim() !== "") ? "active-button" : "banned-button"}
                                rounded-[20px_5px_20px_5px]
                                text-xl text-center
                                transition duration-300
                            `}>
                                {isPending ? "Creating Account" : "Sign Up"}
                            </RippleButton>
                            <div className="mt-1">
                                <p>Already have an account? <span className={`
                                    font-semibold text-[#1E1E1E] auth-pointer
                                `} onClick={() => router.push("/login")}>Log In Here</span></p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
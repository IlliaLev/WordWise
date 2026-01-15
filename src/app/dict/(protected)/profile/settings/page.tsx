"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import RippleButton from "@/components/ui/RippleButton";
import { AnimatePresence, motion } from "framer-motion";

export default function SettingsPage() {
    const supabase = createClient();

    const [currentPassword, setCurrentPassword] = useState("");
    const [isCurPassword, setIsCurPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [isNewPassword, setIsNewPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = async () => {
        setLoading(true);
        setMessage("");

        const {
            data: {user}
        } = await supabase.auth.getUser();

        if(!user?.email) {
            setMessage("User Not Found");
            setIsError(true);
            setLoading(false);
            return;
        }

        const {error: reauthError} = await supabase.auth.signInWithPassword({
            email: user.email,
            password: currentPassword,
        });

        if(reauthError) {
            setMessage("Current Password Is Incorrect");
            setIsError(true);
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if(error) {
            setMessage(error.message);
            setIsError(true);
        } else {
            setMessage("Password Updated Succesfully!");
            setIsError(false);
            setCurrentPassword("");
            setIsCurPassword(false);
            setNewPassword("");
            setIsNewPassword(false);
        }

        setLoading(false);
    }

    return (
        <div className={`
            flex flex-col items-center justify-center page-height
        `}>
            <div className={`
                flex flex-col items-center
                bg-white/50
                w-[90%] min-w-70 max-w-150
                h-100  
                rounded-[40px_15px_40px_15px]
                border-2 border-[#1E1E1E]
                drop-shadow-md drop-shadow-black
            `}>
                <div className={`
                    flex items-center justify-center  
                `}>
                    <h2 className={`
                        text-2xl font-semibold  
                    `}>Change Password</h2>
                </div>
                <div className={`
                    
                    w-full h-full
                    mt-5
                    flex flex-col  items-center
                `}>
                    <div className={`
                        w-[90%] h-full flex flex-col items-center 
                    `}>
                        <h3 className="w-full text-left ml-4 font-semibold text-xl">Current Password</h3>
                        <div className={`
                            flex flex-col justify-center
                            w-full h-12   
                        `}>
                            <input className={`
                            outline-none w-full select-none px-2 
                            `} type="password" value={currentPassword} onBlur={() => setIsCurPassword(currentPassword.trim() !== "" ? true : false)} onFocus={() => setIsCurPassword(true)} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter Current Password" />

                            <AnimatePresence>
                                <motion.span className={`
                                    bg-white
                                    w-full h-0.5
                                    rounded-full  
                                `} initial={{
                                    scaleX: 0,
                                }} animate={{
                                    scaleX: isCurPassword ? 1 : 0,
                                }} exit={{
                                    scaleX: 0,
                                }} transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }}>

                                </motion.span>
                            </AnimatePresence>
                        </div> 
                        
                        <h3 className="w-full text-left ml-4 font-semibold text-xl">New Password</h3>
                        <div className={`
                            flex flex-col justify-center
                            w-full h-12   
                        `}>
                            <input className={`
                            outline-none w-full select-none px-2     
                            `} type="password" onBlur={() => setIsNewPassword(newPassword.trim() !== "" ? true : false)} onFocus={() => setIsNewPassword(true)} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter New Password"/>

                            <AnimatePresence>
                                <motion.span className={`
                                    bg-white
                                    w-full h-0.5
                                    rounded-full  
                                `} initial={{
                                    scaleX: 0,
                                }} animate={{
                                    scaleX: isNewPassword ? 1 : 0,
                                }} exit={{
                                    scaleX: 0,
                                }} transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }}>

                                </motion.span>
                            </AnimatePresence>
                        </div>
                        
                        <div className="w-full flex flex-col items-center justify-center mt-20">
                            <div className={`
                                font-semibold
                                ${isError ? "text-[#B3001B]" : "text-[#00F58B]"}    
                            `}>{message || <div className="mb-2 h-4"></div>}</div>
                            <RippleButton active={!loading} onClick={handlePasswordChange} className={`
                                w-45 h-15 mt-2
                                ${(currentPassword.trim() !== "" && newPassword.trim() !== "") ? "bg-[#00F58B]/50" : "bg-[#00A35C]/50"}
                                ${(currentPassword.trim() !== "" && newPassword.trim() !== "") ? "active-button" : "banned-button"}
                                rounded-[20px_5px_20px_5px]
                                text-xl text-center
                                transition duration-300  
                        `}>Change Password</RippleButton>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
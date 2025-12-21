"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface CheckboxProps {
    checked: boolean,
    onChange: () => void,
    label?: string,
    size: string,
}

export default function Checkbox({checked, onChange, label, size} : CheckboxProps) {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <label className={`
            flex flex-row  checkbox-pointer select-none gap-2
        `} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <input type="checkbox" checked={checked} onChange={onChange} className={`
                hidden  
            `}/>

            <div className={`
                ${size} flex items-center justify-center
                rounded-md
            `}>
                <motion.div className={`
                    w-full h-full rounded-md
                    flex items-center justify-center
                    border-2
                `} initial={{
                    backgroundColor: "rgba(0,0,0,0)",
                    borderColor: "#3D3D3D",
                }} animate={{
                    backgroundColor: checked ? "#1E1E1E" : "rgba(0,0,0,0)",
                    borderColor: checked ? "#1E1E1E" : "#3D3D3D",
                    color: checked ? "#FFFFFF" : "#3D3D3D",
                }} transition={{
                    duration: 0.15,
                    
                }}>
                    <motion.div initial={{
                        opacity: 0,
                    }} animate={{
                        opacity: checked || hovered ? 1 : 0,
                    }} className="flex items-center justify-center">
                        <Check className={`
                            
                        `} size={22}></Check>
                    </motion.div>
                </motion.div>
            </div>
            {label && (
                <span className={`
                      
                `}>{label}</span>
            )}
        </label>
    );
}
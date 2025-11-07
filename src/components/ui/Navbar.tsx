"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {motion, AnimatePresence} from "framer-motion";

const links = [
  {href: "/dict/home", label: "Home"},
  {href: "/dict/dictionary", label: "Dictionary"},
  {href: "/dict/about", label: "About"}
];

export default function Navbar() {
  const pathname = usePathname();
  const [clickedIndex, setClickedIndex] = useState<number>(0);

  return (
    <nav className={`
        flex items-center justify-between
        flex-row
        bg-[#1E1E1E]
        h-20
        text-2xl
        border-b border-b-[#3D3D3D]
    `}>
        <div className={`
          w-15 h-15 p-1
          bg-logo 
          ml-2
          `}></div>
        <div className={`
          flex flex-row
          mr-10 space-x-2
          relative
          `}>
            
          {links.map((link, i) => (
            <div key={link.href} 
              className={`
                relative group
                hover:bg-white/40
                rounded-lg
                py-1 px-1 
                transition duration-300
                `}
              onClick={() => setClickedIndex(i)} 
              >
                
                  {clickedIndex === i && (
                    <motion.span 
                      layoutId="hoverBackground"
                      className="absolute left-0 mt-3 inset-y-full rounded-md bg-white w-full h-0.5"
                      transition={
                        {
                          type: "spring", 
                          stiffness: 300, 
                          damping: 100,
                        }
                      }>
                      
                    </motion.span>
                  )}
                

                <Link href={link.href} className={`
                    relative
                    ${clickedIndex === i ? "text-white" : "text-[#858585]"}
                    group-hover:text-white
                    
                    transition-colors duration-200
                  `}>
                  {link.label}
                </Link>
            </div>
          ))}
        </div>
    </nav>
  );
}
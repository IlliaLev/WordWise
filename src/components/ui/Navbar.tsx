"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {motion, AnimatePresence} from "framer-motion";
import { useApp } from "@/store/useAppStore";
import useWindowSize from "@/hooks/useWindowSize";

const links = [
  {href: "/dict/home", label: "Home"},
  {href: "/dict/dictionary", label: "Dictionary"},
  {href: "/dict/cards", label: "Cards"},
  {href: "/dict/about", label: "About"},
];

export default function Navbar() {
  const pathname = usePathname();
  const {selectedPage, setSelectedPage} = useApp();
  
  const {width, height} = useWindowSize();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const idx = links.findIndex(link => link.href === pathname);
    if(idx !== -1) {
      setSelectedPage(idx);
    }
  }, [pathname, setSelectedPage]);

  const handleClickedIndex = (i: number) => {
    setSelectedPage(i);
  }

  return (
    <nav className={`
        flex items-center justify-between
        flex-row
        bg-[#1E1E1E]
        h-15
        text-2xs
        md:text-xl
        border-b border-b-[#3D3D3D]
    `}>
        <div className={`
          flex flex-row items-center justify-center gap-3 
        `}>
          <div className={`
            w-7 h-7
            md:w-12 md:h-12 
            p-1
            bg-logo 
            ml-5
            shrink-0
            `}></div>
          {mounted && width > 768 ? (<div className={`
            text-2xl
            text-white
          `}>
            Word Wise
          </div>) : (<></>)}
        </div>
        <div className={`
          flex flex-row
          mr-5 space-x-2
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
              onClick={() => handleClickedIndex(i)} 
              >
                
                  {selectedPage === i && (
                    <motion.span 
                      layoutId="hoverBackground"
                      className="absolute left-0 mt-1 inset-y-full rounded-md bg-white w-full h-0.5"
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
                    ${selectedPage === i ? "text-white" : "text-[#858585]"}
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
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {motion, AnimatePresence} from "framer-motion";
import { useApp } from "@/store/useAppStore";
import useWindowSize from "@/hooks/useWindowSize";
import { createClient } from "@/lib/supabase/client";
import { CircleUserRound, LogOut, Settings } from "lucide-react";
import ProfileWindow from "./ProfileWindow";

const links = [
  {href: "/dict/home", label: "Home"},
  {href: "/dict/dictionary", label: "Dictionary"},
  {href: "/dict/cards", label: "Cards"},
  {href: "/dict/about", label: "About"},
];

export default function Navbar() {
  const supabase = createClient();

  const pathname = usePathname();
  const {selectedPage, setSelectedPage} = useApp();
  
  const {width, height} = useWindowSize();

  const [mounted, setMounted] = useState(false);

  const [isLogged, setIsLogged] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const isLoggedIn = useCallback(async () => {
    const {data: {user}} = await supabase.auth.getUser();

    if(user) {
      setIsLogged(true);
    } 
  }, [isLogged, supabase]);

  useEffect(() => {
    isLoggedIn()
  }, [isLogged, isLoggedIn]);

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
        text-xs
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
          flex flex-row items-center
          mr-5 space-x-2
          relative
          
          `}>
            
          {links.map((link, i) => (
            <div key={link.href} 
              className={`
                
                relative group
                hover:bg-white/40
                rounded-lg
                px-1 
                transition duration-300
                `}
              onClick={() => handleClickedIndex(i)} 
              >
                
                  {selectedPage === i && (
                    <motion.span 
                      layoutId="hoverBackground"
                      className="absolute left-0 mt-0.5 inset-y-full rounded-md bg-white w-full h-0.5"
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
          {/*//! Create user here*/}
          <div>
            {isLogged === true ? (
              <>
                <button className={`
                  flex flex-col items-center justify-center
                  text-[#858585]
                  md:h-full
                  hover:text-white
                  transitition-colors duration-200
                  active-button
                `} onClick={() => setIsVisible(true)} disabled={isVisible}>
                  <CircleUserRound></CircleUserRound>
                </button>
                <ProfileWindow isVisible={isVisible} onClose={() => setIsVisible(false)}>
                  <div className={`
                      flex flex-col items-start justify-end
                      bg-[#1E1E1E] border border-[#3D3D3D]
                      h-40 w-30
                      rounded-[15px_5px_15px_5px]
                      space-y-1
                  `}>
                    <Link onClick={() => setIsVisible(false)} href={"/dict/profile/settings"} className="group text-xl text-[#858585] group-hover:text-white mx-1">
                      <div className="flex flex-row group-hover:text-white transition-colors duration-200">
                        <Settings className="mr-1"></Settings>
                        Settings
                      </div>
                    </Link>

                    <form action="/auth/signout" method="post" className="mb-1.5 mx-1">
                      <button type="submit" className={`
                        group signout
                        text-xl
                        text-[#858585]
                      `}>
                        <div className="flex flex-row group-hover:text-white transition-colors duration-200">
                          <LogOut className="mr-1"></LogOut>
                          Sign Out
                        </div>
                      </button>
                    </form>
                  </div>
                </ProfileWindow>
              </>
            ) : (
              <div className={`
                relative group
                hover:bg-white/40
                rounded-lg
                px-1 
                transition duration-300
              `}>
                <Link href={"/login"} className={`
                hover:text-white
                text-[#858585]
                transition-colors duration-200
                `}>
                  Sign In
                </Link>
              </div>
            )
            }
          </div> 
        </div>
    </nav>
  );
}
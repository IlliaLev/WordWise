"use client";

import Link from "next/link";

export default function HomePage() {
    return (
        <div className={`
            
        `}>
            <div className={`
                flex flex-col items-center    
            `}>
                <div className={`
                    pt-10
                    flex flex-col items-center justify-center 
                    text-white bg-[#141414]
                `}>
                    <h1 className="font-bold text-4xl drop-shadow-xs drop-shadow-white">Word Wise</h1>
                    <h2 className="mt-3 font-semibold mb-3">Learn Words. Remember Them. Practice Daily</h2>
                </div>
                <div className={`flex flex-row justify-between w-100 p-5 
                        mt-35
                        bg-white/50
                        border-2 border-[#1E1E1E]
                        rounded-[15px_40px_15px_40px]
                        drop-shadow-md drop-shadow-black
                    `}>
                    <Link href="/dict/dictionary" className={`
                        font-semibold
                        p-2
                        rounded-[15px_40px_15px_40px]
                       bg-transparent
                       hover:bg-[#F4D35E]/70
                       transition-colors duration-300   
                   `}>Explore Dictionary</Link>

                    <Link href="/dict/cards" className={`
                        font-semibold
                        p-2
                        rounded-[15px_40px_15px_40px]
                        bg-transparent
                        hover:bg-[#84BCDA]/70
                        transition-colors duration-300    
                    `}>Explore Cards</Link>
                    <Link href="/signup" className={`
                        font-semibold
                        p-2
                        rounded-[15px_40px_15px_40px]
                        bg-transparent
                        hover:bg-[#EE964B]/70
                        transition-colors duration-300  
                    `}>Sign Up</Link>
                </div>
            </div>
            
        </div>
    );
}
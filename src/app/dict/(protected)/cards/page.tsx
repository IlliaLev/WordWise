"use client";

import CardCarousel from "@/components/ui/CardCarousel";
import useWindowSize from "@/hooks/useWindowSize";

import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect } from "react";

export default function CardsPage() {
    const {width, height} = useWindowSize();

    

    return (
        <div className={`
            my-5
            flex items-center justify-center
            min-h-screen h-screen w-full
        `}>
            {/*<div className={`
                flex items-center justify-center
                
                min-w-100 w-[50%]
                aspect-square
            `}>
                <WordCarousel></WordCarousel>
            </div>*/}
            <div className={`  
                ${width > height ? "h-[80%] max-h-[80%] max-h-[430px]" : "w-[80%] max-w-[80%] max-w-[430px]"}
                aspect-square
            `}>
                <CardCarousel></CardCarousel>
            </div>
        </div>
    );
}
"use client"

import Navbar from "@/components/ui/Navbar";

interface DictLayoutProps {
    children: React.ReactNode,
}

export default function DictLayout({children} : DictLayoutProps) {
    return (
        <div className={`
            min-h-screen flex flex-col
            bg-[#141414] bg-triangles overflow-hidden
        `}>
            <Navbar></Navbar>
            <main className="flex-1">{children}</main>
        </div>
    );
}
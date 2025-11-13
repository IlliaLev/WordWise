"use client";

import { useState, useEffect } from "react";
import type { Word } from "@/store/useAppStore";
import { Pen, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ModalWindow from "./ModalWindow";

interface ListItemProps {
    word: Word,
    onDelete: () => void,
    onEdit: (newWord: Word, index: number) => void,
    index: number,
}

export default function ListItem({word, onDelete, onEdit, index} : ListItemProps) {
    return (
        <div className={`
            w-full
            flex flex-row items-center
            border-b-2 border-b-white
            pb-2
            `}>
            <div className={`
                    flex items-center justify-between gap-1
                    w-full
                `}>
                <div className={`
                    ml-3
                `}>
                    {word.original}
                </div>
                <div className={`
                    mr-6
                `}>
                    {word.translation}
                </div>
            </div>
            <div className={`
                    flex flew-row items-center justify-between 
                    gap-2
                    mr-1
                `}>
                    <button className={`
                        active-button
                    `} onClick={() => onEdit(word, index)}>
                        <Pen className={`
                            hover:text-white
                            transition duration-400
                            w-6 h-6
                            `}></Pen>
                    </button>
                    <button className={`
                        active-button
                    `} onClick={onDelete}>
                        <Trash2 className={`
                            hover:text-white
                            transition duration-400
                            w-6 h-6
                            `}></Trash2>
                    </button>
            </div>
        </div>
    );
}
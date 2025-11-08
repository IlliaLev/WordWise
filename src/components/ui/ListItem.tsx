import type { Word } from "@/store/useAppStore";

interface ListItemProps {
    word: Word,
}

export default function ListItem({word} : ListItemProps) {
    return (
        <div className={`
            w-full
            flex flex-row items-center justify-between gap-1
            border-b-2 border-b-white
            pb-2
            `}>
            <div className={`
                ml-3
                `}>{word.original}</div>
            <div className={`
                mr-3
                `}>{word.translation}</div>
        </div>
    );
}
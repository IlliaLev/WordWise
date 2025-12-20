import { useEffect, useState } from "react";

export default function useWindowSize() {
    const [size, setSize] = useState({
        width: 1024,
        height: 768,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
        });
        };

        handleResize(); 
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return size;
}
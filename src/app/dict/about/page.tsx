"use client";

import Checkbox from "@/components/ui/Checkbox";
import { useState } from "react";

export default function AboutPage() {
    const [checked, setChecked] = useState(false);

    return (
        <div>
            <Checkbox checked={checked} onChange={setChecked} >

            </Checkbox>
        </div>
    );
}
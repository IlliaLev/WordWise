"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation"; 

export async function signup(email: string, password: string) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({email, password});

    if(error) {
        redirect("/dict/about");
    }
}
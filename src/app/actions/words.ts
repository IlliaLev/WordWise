"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getWords() {
    const supabase = await createClient();

    const { data: {user} } = await supabase.auth.getUser();

    if(!user) return [];

    const { data, error } = await supabase.from("words").select("id, original, translation").order("id", {ascending: true});

    if(error) throw error;

    return data ?? [];
}

export async function createWord(original: string, translation: string) {
    const supabase = await createClient();

    const { data: {user} } = await supabase.auth.getUser();

    if(!user) redirect("/login");

    const { error } = await supabase.from("words").insert({
        original,
        translation,
        user_id: user.id,
    });

    if(error) throw error;
}

export async function updateWord(id: number, original: string, translation: string) {
    const supabase = await createClient();

    const { error } = await supabase.from("words").update({original, translation}).eq("id", id);

    if(error) throw error;
}

export async function deleteWord(id: number) {
    const supabase = await createClient();

    const { error } = await supabase.from("words").delete().eq("id", id);

    if(error) throw error;
}
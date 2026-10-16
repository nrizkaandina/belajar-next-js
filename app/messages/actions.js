'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(id) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", id);
  
  if (error) {
    console.error("Gagal menghapus pesan:", error.message);
    return { success: false, error: error.message };
  }
    // Memberi tahu Next.js untuk menyegarkan tampilan halaman /messages secara instan
    revalidatePath("/messages");
    
    return { success: true };
}
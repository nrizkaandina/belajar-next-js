'use server';

import { messages } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteMessageAction(id) {
  // Mencari index pesan berdasarkan id
  const index = messages.findIndex((m) => String(m.id) === String(id));
  
  if (index !== -1) {
    // Menghapus pesan dari array (dummy database)
    messages.splice(index, 1);
    
    // Memanggil revalidatePath untuk membersihkan cache 
    // dan me-refresh UI halaman secara otomatis
    revalidatePath('/messages');
  }
}
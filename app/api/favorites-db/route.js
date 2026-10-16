import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = await createClient(); // instansiasi client async
  const { data, error } = await supabase.from("favorites").select("*");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}
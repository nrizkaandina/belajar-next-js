import { messages } from "@/lib/db";
import { deleteMessageAction } from "./actions";

export default function MessagesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold">Pesan Masuk</h1>

      <div className="mt-8 space-y-4">
        {messages.length === 0 ? (
          <p className="text-muted-foreground">Belum ada pesan masuk.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="rounded-lg border p-4 flex flex-col sm:flex-row justify-between items-start gap-4">
              {/* Bagian Teks Pesan */}
              <div className="flex-1">
                <p className="font-medium">{msg.name} — {msg.email}</p>
                <p className="mt-1 text-sm text-muted-foreground">{msg.message}</p>
              </div>

              {/* Form untuk memanggil server Action Hapus */}
              <form action={deleteMessageAction.bind(null, msg.id)}>
                <button
                  type="submit"
                  classname="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
                >
                  Hapus
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
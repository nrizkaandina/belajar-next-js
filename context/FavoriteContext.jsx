"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  // 1. Ambil user dari Supabase dan gunakan alias 'currentUser' agar tidak 
  // bentrok dengan parameter 'user' pada fungsi addFavorite di bawah
  const { user: currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // 2. Bungkus dalam fungsi async agar lolos dari aturan ESLint 
    // (menghindari pemanggilan setState secara sinkron)
    const fetchFavorites = async () => {
      if (!currentUser) {
        setFavorites((prev) => (prev.length === 0 ? prev : []));
        return;
      }

      try {
        const res = await fetch("/api/favorites");
        const contentType = res.headers.get("content-type");

        // Pastikan response oke dan formatnya benar-benar JSON (bukan HTML error)
        if (res.ok && contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setFavorites(Array.isArray(data) ? data : data?.data || []);
        } else {
          setFavorites((prev) => (prev.length === 0 ? prev : []));
        }
      } catch (error) {
        console.error("Gagal mengambil data favorites:", error);
        setFavorites((prev) => (prev.length === 0 ? prev : []));
      }
    };

    fetchFavorites();
  }, [currentUser]); // Dependency sekarang menggunakan currentUser dari Supabase

  async function addFavorite(user) {
    if (!currentUser) {
      alert("Silakan login terlebih dahulu untuk menambahkan favorite.");
      return;
    }

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });

      if (res.ok) {
        const saved = await res.json();
        // 3. Fallback keamanan menggunakan Array.isArray untuk mencegah error iterasi
        setFavorites((prev) => [...(Array.isArray(prev) ? prev : []), saved]);
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error("Backend menolak data:", errorData);
        alert(`Gagal menyimpan ke database: ${errorData.error || res.statusText}`);
      }
    } catch (error) {
      console.error("Error addFavorite:", error);
    }
  }

  async function removeFavorite(userId) {
    try {
      const res = await fetch(`/api/favorites/${userId}`, { method: "DELETE" });

      if (res.ok) {
        setFavorites((prev) => 
          (Array.isArray(prev) ? prev : []).filter((f) => f.user_id !== userId)
        );
      }
    } catch (error) {
      console.error("Error removeFavorite:", error);
    }
  }

  function isFavorite(userId) {
    return (Array.isArray(favorites) ? favorites : []).some(
      (f) => f.user_id === userId
    );
  }

  const value = { favorites, addFavorite, removeFavorite, isFavorite };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorite harus dipakai di dalam <FavoriteProvider>");
  }
  return context;
}
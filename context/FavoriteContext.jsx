"use client";

import { createContext, useContext, useState } from "react";

// 1. Buat Context
const FavoriteContext = createContext();

// 2. Buat Provider Component
export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Fungsi untuk toggle (Add / Remove)
  const toggleFavorite = (user) => {
    setFavorites((prevFavorites) => {
      // Cek apakah user sudah ada di daftar favorit
      const isExist = prevFavorites.some((fav) => fav.id === user.id);
      
      if (isExist) {
        // Hapus dari favorit jika sudah ada
        return prevFavorites.filter((fav) => fav.id !== user.id);
      } else {
        // Tambahkan ke favorit jika belum ada
        return [...prevFavorites, user];
      }
    });
  };

  // Fungsi untuk mengecek status favorit berdasarkan ID
  const isFavorite = (userId) => {
    return favorites.some((fav) => fav.id === userId);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

// 3. Buat Custom Hook agar lebih mudah dipanggil
export const useFavorite = () => useContext(FavoriteContext);
"use client";

import { useFavorite } from "@/context/FavoriteContext";
import UserCard from "@/components/UserCard"; // Sesuaikan path

export default function FavoritesPage() {
  const { favorites } = useFavorite();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Favorites Users</h1>
      
      {favorites.length === 0 ? (
        <p className="text-muted-foreground">Belum ada user yang difavoritkan.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
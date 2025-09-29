"use client";

import { useEffect, useState } from "react";
import { Country } from "@/types/country";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from 'lucide-react';
import { toast } from "sonner";

export default function FavoritesPage() {
  //HOOK DE REACT
  const [items, setItems] = useState<Country[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("favorites");
    setItems(raw ? JSON.parse(raw) : []);
  }, []);

  //ELIMINACION DE PAIS LISTA FAVORITO, RENDERIZADO TOAST
  function remove(cca3: string) {
    const next = items.filter((c) => c.cca3 !== cca3);
    setItems(next);
    localStorage.setItem("favorites", JSON.stringify(next));
    toast.error("Eliminado de favoritos", {
    description: `El país con código ${cca3} fue eliminado.`,
  });
  }

  return (
    <main className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lista de Favoritos</h1>
        <Link href="/" scroll={false} className="text-blue-600 underline">
          <Button  size="sm" className="gap-1">
             <CircleArrowLeft className="h-4 w-4"/>Volvere
          </Button>
        </Link>
      </header>

      {items.length === 0 ? (
        <p>No tienes favoritos aún.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((c) => (
            <li key={c.cca3} className="border rounded p-3 bg-white">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">{c.name.common}</span>
                <Button variant="outline" size="sm" onClick={() => remove(c.cca3)}>
                  Quitar
                </Button>
              </div>
              <p className="text-sm">Región: {c.region}</p>
              <p className="text-sm">Población: {c.population.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

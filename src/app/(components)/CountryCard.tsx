"use client";

import Link from "next/link";
import { Country } from "@/types/country";
import { Button  } from "@/components/ui/button";
import { Eye, Star } from "lucide-react";

function addToFavorites(country: Country) {
  const raw = localStorage.getItem("favorites");
  const list: Country[] = raw ? JSON.parse(raw) : [];
  if (!list.some((c) => c.cca3 === country.cca3)) {
    list.push(country);
    localStorage.setItem("favorites", JSON.stringify(list));
    // feedback simple (puedes usar toast de shadcn si lo añades)
    alert("Añadido a favoritos");
  } else {
    alert("Ya está en favoritos");
  }
}

export default function CountryCard({ country }: { country: Country }) {
  const flag = country.flags.svg || country.flags.png || "";
  return (
    <article className="border rounded-xl bg-white shadow-sm overflow-hidden">
      <div className="flex justify-center bg-muted/20 p-4">
        <img
          src={flag}
          alt={country.flags.alt || country.name.common}
          className="h-28 object-cover"
        />
      </div>
      <div className="p-3 space-y-1">
        <h3 className="text-lg font-semibold">{country.name.common}</h3>
        <p className="text-sm text-muted-foreground">Región: {country.region}</p>
        <p className="text-sm text-muted-foreground">
          Población: {country.population.toLocaleString()}
        </p>

        <div className="flex gap-2 pt-2">
          <Link href={`/?code=${country.cca3}`} scroll={false} className="text-blue-600 underline">
            <Button  size="sm" className="gap-1">
               <Eye className="h-4 w-4"/>Ver detalle
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="gap-1" onClick={() => addToFavorites(country)}>
            <Star className="h-4 w-4"/>Favorito
          </Button>
        </div>
      </div>
    </article>
  );
}

"use client";

import Link from "next/link";
import { Country } from "@/types/country";
import { Button } from "@/components/ui/button";

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
    <article className="border rounded-lg overflow-hidden bg-white">
      <img
        src={flag}
        alt={country.flags.alt || country.name.common}
        className="w-full h-40 object-cover"
      />
      <div className="p-3 space-y-1">
        <h3 className="font-semibold">{country.name.common}</h3>
        <p className="text-sm">Región: {country.region}</p>
        <p className="text-sm">
          Población: {country.population.toLocaleString()}
        </p>

        <div className="flex gap-3 pt-2">
          <Link href={`/?code=${country.cca3}`} scroll={false} className="text-blue-600 underline">
            Ver detalle
          </Link>
          <Button variant="outline" size="sm" onClick={() => addToFavorites(country)}>
            ★ Favorito
          </Button>
        </div>
      </div>
    </article>
  );
}

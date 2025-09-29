import { fetchAllCountries } from "@/lib/restcountries";
import { Country } from "@/types/country";
import CountryGrid from "./(components)/CountryGrid";
import CountryModal from "./(components)/CountryModal";
import SearchBar from "./(components)/SearchBar";
import Filters from "./(components)/Filters";
import Sort from "./(components)/Sort";

export const revalidate = 1800; // 30 min

type Search = {
  q?: string;
  region?: string;
  min?: string;
  max?: string;
  sort?: "name" | "population";
  code?: string;
};

export default async function Home({ searchParams }: { searchParams?: Search }) {
  const { q = "", region = "", min = "", max = "", sort = "name", code = "" } = searchParams ?? {};
  const all = await fetchAllCountries();

  // Filtrado en servidor
  const qLower = q.trim().toLowerCase();
  const minPop = Number(min) || 0;
  const maxPop = Number(max) || Number.MAX_SAFE_INTEGER;

  let filtered: Country[] = all.filter((c) => {
    const matchesQ = !qLower || c.name.common.toLowerCase().includes(qLower);
    const matchesRegion = !region || c.region === region;
    const matchesPop = c.population >= minPop && c.population <= maxPop;
    return matchesQ && matchesRegion && matchesPop;
  });

  // Orden
  if (sort === "population") {
    filtered.sort((a, b) => a.population - b.population);
  } else {
    filtered.sort((a, b) =>
      a.name.common.localeCompare(b.name.common, undefined, { sensitivity: "base" })
    );
  }

  const selected = code ? filtered.find((c) => c.cca3 === code) : undefined;

  return (
    <main className="space-y-4">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold">Countries</h1>
        <a className="underline text-sm" href="/favorites">/favorites</a>
      </header>

      <div className="flex flex-wrap gap-3 items-end">
        <SearchBar />
        <Filters />
        <Sort />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-600">No hay países que coincidan con los filtros.</p>
      ) : (
        <CountryGrid countries={filtered} />
      )}

      {selected ? <CountryModal country={selected} /> : null}
    </main>
  );
}
import { Country } from "@/types/country";
import CountryCard from "./CountryCard";

export default function CountryGrid({ countries }: { countries: Country[] }) {
  return (
    // RENDERIZADO POR CADA PAIS SEGUN SU CCA3
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {countries.map((c) => <CountryCard key={c.cca3} country={c} />)}
    </section>
  );
}

// lib/restcountries.ts
import { Country } from "@/types/country";

const FIELDS = "name,cca3,flags,region,population,capital";

export async function fetchAllCountries(): Promise<Country[]> {
  const res = await fetch(
    `https://restcountries.com/v3.1/all?fields=${FIELDS}`,
    { cache: "force-cache", next: { revalidate: 1800 } } // 30 min
  );
  if (!res.ok) throw new Error("Failed to fetch countries");
  const data = (await res.json()) as Country[];
  return data;
}
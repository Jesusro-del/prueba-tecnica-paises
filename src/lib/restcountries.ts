import { Country } from "@/types/country";

//CAMPOS DESEADOS A EXTRAER DE API
const FIELDS = "name,cca3,flags,region,population,capital";

//SOLICITUD HTTP A API
export async function fetchAllCountries(): Promise<Country[]> {
  const res = await fetch(
    `https://restcountries.com/v3.1/all?fields=${FIELDS}`,
    { cache: "force-cache", next: { revalidate: 1800 } } // 30 min
  );
  //VALIDACION 
  if (!res.ok) throw new Error("Failed to fetch countries");
  //CONVERSION A FORMATO JSON Y TIPEADA COMO ARREGLO DE COUNTRY
  const data = (await res.json()) as Country[];
  return data;
}
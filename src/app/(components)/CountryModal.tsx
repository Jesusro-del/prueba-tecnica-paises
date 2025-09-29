import Link from "next/link";
import { Country } from "@/types/country";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function CountryModal({ country }: { country: Country }) {
  const flag = country.flags.svg || country.flags.png || "";
  return (
    <Dialog open>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{country.name.official}</DialogTitle>
        </DialogHeader>

        <img
          src={flag}
          alt={country.flags.alt || country.name.common}
          className="w-full h-48 object-contain rounded"
        />

        <div className="space-y-1">
          <p><b>Región:</b> {country.region}</p>
          <p><b>Capital:</b> {country.capital?.join(", ") || "—"}</p>
          <p><b>Población:</b> {country.population.toLocaleString()}</p>
        </div>

        <div className="pt-2">
          <Link href="/" scroll={false} className="text-sm underline">
            Cerrar
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

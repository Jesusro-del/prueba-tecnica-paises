import Link from "next/link";
import { Country } from "@/types/country";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function CountryModal({ country }: { country: Country }) {
  const flag = country.flags.svg || country.flags.png || "";
  return (
    <Dialog open>
      <DialogContent className="max-w-lg">
        <div className="flex justify-between">
          <DialogHeader>
            <DialogTitle>{country.name.official}</DialogTitle>
          </DialogHeader>
          <DialogClose asChild>
            <Link href="/" scroll={false} aria-label="Cerrar">
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </Link>
          </DialogClose>
        </div>
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
      </DialogContent>
    </Dialog>
  );
}

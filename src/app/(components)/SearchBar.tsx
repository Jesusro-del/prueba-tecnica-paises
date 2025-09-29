"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

//PERSISTIMOS FILTROS POR URL CON LOS HOOKS DE NEXT.JS
export default function SearchBar() {
  const sp = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function update(val: string) {
    const params = new URLSearchParams(sp.toString());
    if (val) params.set("q", val);
    else params.delete("q");
    params.delete("code"); 
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); //ACUTALIZACION DE URL
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">Buscar</label>
      <Input
        placeholder="Nombre del país..."
        defaultValue={sp.get("q") || ""}
        onChange={(e) => update(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}

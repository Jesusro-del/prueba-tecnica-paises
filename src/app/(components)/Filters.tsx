"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

//PERSISTIMOS FILTROS POR URL CON LOS HOOKS DE NEXT.JS
export default function Filters() {
  const sp = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function setParam(key: string, val: string) {
    const params = new URLSearchParams(sp.toString());

    // ALL : SIN FILTRO
    if (val === "all" || val === "") {
      params.delete(key);
    } else {
      params.set(key, val);
    }

    params.delete("code"); 
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap items-end gap-3">
      {/* Región */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Región</label>
        <Select
          defaultValue={sp.get("region") || "all"}
          onValueChange={(v) => setParam("region", v)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Todas las regiones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {REGIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Población mínima */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Población mín.</label>
        <Input
          type="number"
          placeholder="0"
          defaultValue={sp.get("min") || ""}
          onChange={(e) => setParam("min", e.target.value)}
          className="w-40"
        />
      </div>

      {/* Población máxima */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Población máx.</label>
        <Input
          type="number"
          placeholder="∞"
          defaultValue={sp.get("max") || ""}
          onChange={(e) => setParam("max", e.target.value)}
          className="w-40"
        />
      </div>
    </div>
  );
}

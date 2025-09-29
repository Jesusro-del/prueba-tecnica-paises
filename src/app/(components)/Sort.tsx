"use client";

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Sort() {
  const sp = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const current = sp.get("sort") || "name";

  function setSort(val: string) {
    const params = new URLSearchParams(sp.toString());
    params.set("sort", val);
    params.delete("code");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">Ordenar por</label>
      <Select defaultValue={current} onValueChange={setSort}>
        <SelectTrigger className="w-52">
          <SelectValue placeholder="Nombre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Nombre</SelectItem>
          <SelectItem value="population">Población</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

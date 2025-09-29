//MOLDE DE OBJETOS -> COMPARTE SIMILITUD CON LAS INTERFACES
export type Country = {
  name: { common: string; official: string };
  cca3: string;
  flags: { svg?: string; png?: string; alt?: string };
  region: string;
  population: number;
  capital?: string[];
};

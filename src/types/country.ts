export type Country = {
  name: { common: string; official: string };
  cca3: string;
  flags: { svg?: string; png?: string; alt?: string };
  region: string;
  population: number;
  capital?: string[];
};

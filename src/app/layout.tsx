import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prueba Técnica – Explorador de Países",
  description: "Mini aplicación con Next.js que consume la API de RestCountries y muestra información de países con filtros y favoritos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="container mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}

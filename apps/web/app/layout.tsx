import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hypotekárna kalkulačka 2.0",
  description: "Rýchly a presný výpočet hypotéky podľa aktuálnych pravidiel NBS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}

import { CalculatorForm } from "./components/CalculatorForm";

export default function KalkulackaPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-8 text-2xl font-bold">Výpočet hypotéky</h1>
      <CalculatorForm />
    </main>
  );
}

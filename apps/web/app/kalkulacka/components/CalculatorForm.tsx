"use client";

import { useMemo, useState } from "react";
import { computeMortgage } from "@hk/mortgage-engine";
import type { MortgageInput } from "@hk/shared-types";
import { Button } from "@hk/ui";

const DEFAULT_INPUT: MortgageInput = {
  loanAmount: 150_000,
  propertyValue: 180_000,
  interestRateAnnualPct: 4,
  termYears: 30,
  applicantNetIncomeMonthly: 1_800,
  existingMonthlyDebtPayments: 0,
};

/**
 * Okamžitý náhľad výpočtu beží priamo v prehliadači cez @hk/mortgage-engine (rovnaká
 * logika ako na backende). Oficiálny/uložený výpočet pôjde cez apps/api (lib/api-client.ts).
 */
export function CalculatorForm() {
  const [input, setInput] = useState<MortgageInput>(DEFAULT_INPUT);

  const result = useMemo(() => computeMortgage(input), [input]);

  function updateField<K extends keyof MortgageInput>(field: K, value: string) {
    setInput((prev) => ({ ...prev, [field]: Number(value) }));
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <form className="flex flex-col gap-4">
        <Field
          label="Výška úveru (€)"
          value={input.loanAmount}
          onChange={(v) => updateField("loanAmount", v)}
        />
        <Field
          label="Hodnota nehnuteľnosti (€)"
          value={input.propertyValue}
          onChange={(v) => updateField("propertyValue", v)}
        />
        <Field
          label="Úroková sadzba (% p.a.)"
          value={input.interestRateAnnualPct}
          onChange={(v) => updateField("interestRateAnnualPct", v)}
          step="0.01"
        />
        <Field
          label="Doba splácania (roky)"
          value={input.termYears}
          onChange={(v) => updateField("termYears", v)}
        />
        <Field
          label="Čistý mesačný príjem (€)"
          value={input.applicantNetIncomeMonthly}
          onChange={(v) => updateField("applicantNetIncomeMonthly", v)}
        />
        <Field
          label="Existujúce mesačné splátky (€)"
          value={input.existingMonthlyDebtPayments}
          onChange={(v) => updateField("existingMonthlyDebtPayments", v)}
        />
      </form>

      <section className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Výsledok</h2>
        <ResultRow label="Mesačná splátka" value={`${result.monthlyPayment.toFixed(2)} €`} />
        <ResultRow label="RPMN" value={`${result.aprPct.toFixed(2)} %`} />
        <ResultRow label="LTV" value={`${result.ltvPct.toFixed(1)} %`} />
        <ResultRow label="DSTI" value={`${result.dstiPct.toFixed(1)} %`} />
        <ResultRow label="Celkovo zaplatené" value={`${result.totalPayment.toFixed(0)} €`} />
        <div
          className={`mt-2 rounded-md px-3 py-2 text-sm font-medium ${
            result.withinNbsLimits
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {result.withinNbsLimits
            ? "V rámci limitov NBS"
            : "Mimo limitov NBS (LTV alebo DSTI)"}
        </div>
        <Button variant="secondary" type="button" className="mt-4">
          Uložiť žiadosť
        </Button>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: string) => void;
  step?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-gray-600">{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2"
      />
    </label>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

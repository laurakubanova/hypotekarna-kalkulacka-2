import type { MortgageInput, MortgageResult, BankRate } from "@hk/shared-types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    throw new Error(`API ${path} zlyhalo so stavom ${res.status}`);
  }

  return res.json() as Promise<T>;
}

/** Oficiálny/auditovateľný výpočet na backende (ukladá sa, na rozdiel od client-side náhľadu). */
export function calculateMortgage(input: MortgageInput): Promise<MortgageResult> {
  return request<MortgageResult>("/mortgage/calculate", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function listBankRates(): Promise<BankRate[]> {
  return request<BankRate[]>("/rates");
}

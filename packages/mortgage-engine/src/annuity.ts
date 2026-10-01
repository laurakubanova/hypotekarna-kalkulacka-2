import type { AmortizationRow } from "@hk/shared-types";

/** Mesačná anuitná splátka. */
export function calculateMonthlyPayment(
  principal: number,
  annualRatePct: number,
  termYears: number,
): number {
  const monthlyRate = annualRatePct / 100 / 12;
  const numPayments = termYears * 12;

  if (monthlyRate === 0) {
    return principal / numPayments;
  }

  const factor = Math.pow(1 + monthlyRate, numPayments);
  return (principal * monthlyRate * factor) / (factor - 1);
}

/** Kompletná amortizačná (splátková) tabuľka. */
export function buildAmortizationSchedule(
  principal: number,
  annualRatePct: number,
  termYears: number,
): AmortizationRow[] {
  const monthlyRate = annualRatePct / 100 / 12;
  const numPayments = termYears * 12;
  const payment = calculateMonthlyPayment(principal, annualRatePct, termYears);

  const schedule: AmortizationRow[] = [];
  let remainingBalance = principal;

  for (let month = 1; month <= numPayments; month++) {
    const interest = remainingBalance * monthlyRate;
    const principalPaid = payment - interest;
    remainingBalance = Math.max(0, remainingBalance - principalPaid);

    schedule.push({
      month,
      payment: round2(payment),
      principal: round2(principalPaid),
      interest: round2(interest),
      remainingBalance: round2(remainingBalance),
    });
  }

  return schedule;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

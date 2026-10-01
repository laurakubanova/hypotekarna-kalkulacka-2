import type { MortgageInput, MortgageResult } from "@hk/shared-types";
import { calculateMonthlyPayment, buildAmortizationSchedule } from "./annuity";
import { isWithinNbsLimits } from "./limits";

export * from "./annuity";
export * from "./limits";

/**
 * Hlavný vstupný bod doménovej logiky – používa ho rovnako apps/web (okamžitý náhľad)
 * aj apps/api (oficiálny výpočet pri uložení žiadosti).
 */
export function computeMortgage(
  input: MortgageInput,
  options: { includeSchedule?: boolean } = {},
): MortgageResult {
  const { loanAmount, propertyValue, interestRateAnnualPct, termYears } = input;

  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRateAnnualPct, termYears);
  const totalPayment = monthlyPayment * termYears * 12;
  const totalInterest = totalPayment - loanAmount;

  const ltvPct = (loanAmount / propertyValue) * 100;
  const totalMonthlyDebt = monthlyPayment + input.existingMonthlyDebtPayments;
  const dstiPct =
    input.applicantNetIncomeMonthly > 0
      ? (totalMonthlyDebt / input.applicantNetIncomeMonthly) * 100
      : 100;

  // TODO: nahradiť presným výpočtom RPMN (iteratívne riešenie vrátane poplatkov),
  // zatiaľ zjednodušené na nominálnu úrokovú sadzbu.
  const aprPct = interestRateAnnualPct;

  return {
    monthlyPayment: round2(monthlyPayment),
    totalPayment: round2(totalPayment),
    totalInterest: round2(totalInterest),
    aprPct,
    ltvPct: round2(ltvPct),
    dstiPct: round2(dstiPct),
    withinNbsLimits: isWithinNbsLimits(ltvPct, dstiPct),
    amortizationSchedule: options.includeSchedule
      ? buildAmortizationSchedule(loanAmount, interestRateAnnualPct, termYears)
      : undefined,
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

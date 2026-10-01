import { z } from "zod";

/** Vstup pre výpočet hypotéky (request kontrakt FE -> BE aj web -> mortgage-engine). */
export const MortgageInputSchema = z.object({
  loanAmount: z.number().positive(),
  propertyValue: z.number().positive(),
  interestRateAnnualPct: z.number().positive().max(30),
  termYears: z.number().int().min(1).max(40),
  applicantNetIncomeMonthly: z.number().nonnegative(),
  existingMonthlyDebtPayments: z.number().nonnegative().default(0),
  applicantAge: z.number().int().min(18).max(80).optional(),
});
export type MortgageInput = z.infer<typeof MortgageInputSchema>;

/** Jeden riadok amortizačnej tabuľky. */
export const AmortizationRowSchema = z.object({
  month: z.number().int().positive(),
  payment: z.number(),
  principal: z.number(),
  interest: z.number(),
  remainingBalance: z.number(),
});
export type AmortizationRow = z.infer<typeof AmortizationRowSchema>;

/** Výsledok výpočtu hypotéky vrátane regulačných ukazovateľov (LTV, DSTI). */
export const MortgageResultSchema = z.object({
  monthlyPayment: z.number(),
  totalPayment: z.number(),
  totalInterest: z.number(),
  aprPct: z.number(),
  ltvPct: z.number(),
  dstiPct: z.number(),
  withinNbsLimits: z.boolean(),
  amortizationSchedule: z.array(AmortizationRowSchema).optional(),
});
export type MortgageResult = z.infer<typeof MortgageResultSchema>;

/** Úroková ponuka banky pre daný produkt a fixáciu. */
export const BankRateSchema = z.object({
  id: z.string().uuid(),
  bankName: z.string(),
  productName: z.string(),
  interestRateAnnualPct: z.number().positive(),
  fixationYears: z.number().int().positive(),
  maxLtvPct: z.number().positive().max(100),
  minLoanAmount: z.number().positive(),
  validFrom: z.string().datetime(),
});
export type BankRate = z.infer<typeof BankRateSchema>;

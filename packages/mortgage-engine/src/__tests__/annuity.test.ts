import { describe, expect, it } from "vitest";
import { calculateMonthlyPayment, buildAmortizationSchedule } from "../annuity";
import { computeMortgage } from "../index";

describe("calculateMonthlyPayment", () => {
  it("vypočíta anuitnú splátku pre štandardnú hypotéku", () => {
    const payment = calculateMonthlyPayment(100_000, 4, 30);
    expect(payment).toBeCloseTo(477.42, 1);
  });

  it("rozdelí istinu rovnomerne pri nulovom úroku", () => {
    const payment = calculateMonthlyPayment(120_000, 0, 10);
    expect(payment).toBeCloseTo(1_000, 2);
  });
});

describe("buildAmortizationSchedule", () => {
  it("posledná splátka doplatí zostatok istiny na nulu", () => {
    const schedule = buildAmortizationSchedule(100_000, 4, 30);
    expect(schedule).toHaveLength(360);
    expect(schedule.at(-1)?.remainingBalance).toBe(0);
  });
});

describe("computeMortgage", () => {
  it("označí hypotéku ako mimo limitov NBS pri vysokom LTV", () => {
    const result = computeMortgage({
      loanAmount: 190_000,
      propertyValue: 200_000,
      interestRateAnnualPct: 4,
      termYears: 30,
      applicantNetIncomeMonthly: 1_500,
      existingMonthlyDebtPayments: 0,
    });

    expect(result.ltvPct).toBeCloseTo(95, 2);
    expect(result.withinNbsLimits).toBe(false);
  });
});

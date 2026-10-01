import { Injectable } from "@nestjs/common";
import { computeMortgage } from "@hk/mortgage-engine";
import type { MortgageResult } from "@hk/shared-types";
import type { CalculateMortgageDto } from "./dto/calculate-mortgage.dto";

@Injectable()
export class MortgageService {
  /**
   * Oficiálny výpočet – rovnaká doménová logika ako client-side náhľad vo web app,
   * ale toto je miesto, kde sa výsledok v budúcnosti perzistuje (napr. k žiadosti/leadu).
   */
  calculate(input: CalculateMortgageDto): MortgageResult {
    return computeMortgage(input, { includeSchedule: true });
  }
}

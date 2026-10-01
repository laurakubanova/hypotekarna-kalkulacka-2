import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import type { MortgageResult } from "@hk/shared-types";
import { MortgageService } from "./mortgage.service";
import { MortgageInputSchema, type CalculateMortgageDto } from "./dto/calculate-mortgage.dto";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";

@Controller("mortgage")
export class MortgageController {
  constructor(private readonly mortgageService: MortgageService) {}

  @Post("calculate")
  @UsePipes(new ZodValidationPipe(MortgageInputSchema))
  calculate(@Body() input: CalculateMortgageDto): MortgageResult {
    return this.mortgageService.calculate(input);
  }
}

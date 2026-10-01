import { Module } from "@nestjs/common";
import { MortgageModule } from "./modules/mortgage/mortgage.module";
import { RatesModule } from "./modules/rates/rates.module";
import { BanksModule } from "./modules/banks/banks.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [MortgageModule, RatesModule, BanksModule, AuthModule],
})
export class AppModule {}

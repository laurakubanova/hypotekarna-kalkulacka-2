import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("MortgageController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /mortgage/calculate vráti platný výsledok", async () => {
    const response = await request(app.getHttpServer())
      .post("/mortgage/calculate")
      .send({
        loanAmount: 150_000,
        propertyValue: 180_000,
        interestRateAnnualPct: 4,
        termYears: 30,
        applicantNetIncomeMonthly: 1_800,
        existingMonthlyDebtPayments: 0,
      });

    expect(response.status).toBe(201);
    expect(response.body.withinNbsLimits).toBe(true);
  });
});

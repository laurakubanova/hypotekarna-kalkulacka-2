# Poznámky k regulácii NBS

> Tento dokument sleduje, prečo sú nastavené konkrétne regulačné limity v
> `packages/mortgage-engine/src/limits.ts`, a treba ho aktualizovať pri každej zmene
> opatrenia Národnej banky Slovenska (NBS) o hypotekárnych úveroch.

## Aktuálny stav v kóde (zjednodušené, k overeniu)

| Ukazovateľ | Limit v kóde | Poznámka |
| ---------- | ------------ | -------- |
| LTV (Loan-to-Value) | 90 % | NBS v praxi používa pásma (napr. väčšina úverov do 80 %, obmedzený podiel do 90 %) – aktuálny kód to zjednodušuje na jeden strop. |
| DSTI (Debt Service to Income) | 60 % | NBS historicky stanovovala DSTI strop (napr. 60 % čistého príjmu), s výnimkami pre žiadateľov do 35 rokov. |

## TODO pred produkčným nasadením

- [ ] Overiť aktuálne platné opatrenie NBS (LTV pásma, DSTI strop, výnimky pre mladých žiadateľov).
- [ ] Zapracovať LTV ako pásmové pravidlo (nie jeden strop), ak to NBS vyžaduje.
- [ ] Zapracovať vekovú výnimku pre DSTI (pole `applicantAge` v `MortgageInput` je pripravené).
- [ ] Zdokumentovať zdroj (link na opatrenie NBS) a dátum poslednej kontroly nižšie.

## História zmien

| Dátum | Zmena | Zdroj |
| ----- | ----- | ----- |
| 2026-10-01 | Počiatočný zjednodušený skeleton (LTV 90 %, DSTI 60 %) | interný odhad, nutné overiť |

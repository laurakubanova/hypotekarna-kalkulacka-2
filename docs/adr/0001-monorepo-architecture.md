# ADR 0001: Monorepo s oddeleným doménovým jadrom

- **Stav**: Prijaté
- **Dátum**: 2026-10-01

## Kontext

Hypotekárna kalkulačka 2.0 má byť fullstack platforma (web kalkulačka + API + DB na správu
sadzieb a žiadostí). Potrebujeme štruktúru, ktorá umožní:

- zdieľať typy a validáciu medzi frontendom a backendom bez duplicity,
- mať matematický/regulačný výpočet na jednom mieste, testovateľný nezávisle od frameworkov,
- škálovať tím (viacero ľudí na FE/BE súčasne) bez neustálych merge konfliktov cez balíky.

## Rozhodnutie

- Monorepo spravované cez **pnpm workspaces + Turborepo**.
- `apps/web` (Next.js) a `apps/api` (NestJS) ako samostatné nasaditeľné jednotky.
- `packages/mortgage-engine` ako čisté doménové jadro bez závislosti na Next.js/Nest.
- `packages/shared-types` (Zod) ako jediný zdroj kontraktu FE <-> BE.

## Zvažované alternatívy

- **Dva samostatné repozitáre (FE/BE)** – zamietnuté, pretože by vyžadovalo publikovanie
  zdieľaných typov cez npm balík a verzovanie, čo spomaľuje iteráciu v ranej fáze projektu.
- **Next.js API routes namiesto samostatného NestJS backendu** – zamietnuté, pretože správa
  sadzieb/bánk/používateľov s RBAC a budúcimi integráciami (napr. napojenie na banky, CRM)
  si vyžaduje štruktúrovanejší backend než Next.js route handlers ponúkajú.

## Dôsledky

- Vyžaduje Turborepo/pnpm znalosti v tíme (nízka bariéra, dobre zdokumentované).
- Zmena kontraktu (`shared-types`) sa prejaví v oboch appkách v rámci jedného PR – menej
  "broken contract" bugov, ale vyžaduje disciplínu pri code review naprieč FE/BE.

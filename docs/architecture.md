# Architektúra

## Prehľad

Monorepo (pnpm workspaces + Turborepo) so štyrmi vrstvami:

1. **`apps/web`** – Next.js (App Router). Verejná kalkulačka počíta náhľad výsledku priamo
   v prehliadači cez `@hk/mortgage-engine` (okamžitá odozva bez round-tripu na server).
   Oficiálne/ukladané výpočty idú cez `lib/api-client.ts` na `apps/api`.
2. **`apps/api`** – NestJS REST API. Moduly podľa domén: `mortgage` (výpočet + perzistencia),
   `rates` (správa úrokových ponúk bánk), `banks` (číselník), `auth` (JWT/RBAC).
3. **`packages/mortgage-engine`** – čistá doménová logika bez závislosti na frameworku
   (anuita, amortizačná tabuľka, LTV/DSTI limity). Zdieľaná medzi `web` a `api`, takže klientský
   náhrad a serverový oficiálny výpočet nikdy nemôžu divergovať.
4. **`packages/shared-types`** – Zod schémy, ktoré sú zároveň runtime validácia (na backende)
   aj zdroj TypeScript typov (na oboch stranách).

## Prečo zdieľaný `mortgage-engine`

Najkritickejšia časť aplikácie je matematický a regulačný výpočet. Keď je oddelený od
frameworkov (žiadne závislosti na Next.js ani Nest), je:

- 100% jednotkovo testovateľný bez mockovania HTTP/DB,
- bezpečne spustiteľný na klientovi pre okamžitý náhľad,
- jediný zdroj pravdy pre to, čo sa neskôr uloží do databázy cez API.

## Dátový tok výpočtu

```
používateľ vyplní formulár (apps/web)
        │
        ▼
@hk/mortgage-engine.computeMortgage()   ◄── beží client-side, okamžitý náhľad
        │
        ▼ (na "Uložiť žiadosť")
POST /mortgage/calculate (apps/api)
        │
        ▼
@hk/mortgage-engine.computeMortgage()   ◄── rovnaká funkcia, beží server-side
        │
        ▼
Prisma -> PostgreSQL (MortgageApplication)
```

## Regulačné limity (NBS)

Pozri [`nbs-regulation-notes.md`](./nbs-regulation-notes.md) – hodnoty LTV/DSTI limitov v
`packages/mortgage-engine/src/limits.ts` sú zjednodušené a musia sa pred produkčným nasadením
overiť a verzovať podľa aktuálne platného opatrenia NBS.

## Ďalšie rozhodnutia

Pozri [`adr/`](./adr) pre zdôvodnenie konkrétnych architektonických volieb.

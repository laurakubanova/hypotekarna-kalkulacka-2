# Hypotekárna kalkulačka 2.0

Monorepo (pnpm + Turborepo) pre fullstack platformu hypotekárnej kalkulačky: Next.js frontend,
NestJS backend, PostgreSQL databáza a zdieľaná doménová výpočtová logika.

## Štruktúra

```
apps/
  web/              Next.js (App Router) – verejná kalkulačka, admin UI
  api/              NestJS – REST API, moduly: mortgage, rates, banks, users, auth
packages/
  mortgage-engine/  Čistá doménová logika výpočtu (anuita, RPMN, LTV/DSTI limity)
  shared-types/     Zod schémy a DTO zdieľané medzi web a api
  ui/               Zdieľaný dizajn systém
  config/           Zdieľaný eslint/prettier config
infra/
  docker/           Dockerfile.web, Dockerfile.api, docker-compose.yml
docs/
  architecture.md, nbs-regulation-notes.md, adr/
```

Podrobné odôvodnenie architektúry je v [`docs/architecture.md`](./docs/architecture.md).

## Požiadavky

- Node.js >= 20
- pnpm >= 9 (`corepack enable` odporúčané)
- Docker (pre lokálnu PostgreSQL databázu)

> Poznámka: tento skeleton bol vygenerovaný bez spusteného `pnpm install` (Node.js nie je
> nainštalovaný v prostredí, kde bol projekt vytvorený). Pred prvým spustením je potrebné:

## Prvé spustenie

```bash
corepack enable
pnpm install

# lokálna databáza
docker compose -f infra/docker/docker-compose.yml up -d postgres

# Prisma migrácie
pnpm db:generate
pnpm db:migrate

# dev režim (web + api súbežne cez turbo)
pnpm dev
```

- Web beží na `http://localhost:3000`
- API beží na `http://localhost:3001`

## Užitočné príkazy

| Príkaz            | Popis                                   |
| ------------------ | ---------------------------------------- |
| `pnpm dev`          | spustí web aj api v dev režime           |
| `pnpm build`        | zostaví všetky apps/packages              |
| `pnpm lint`         | lint naprieč monorepom                   |
| `pnpm typecheck`    | typová kontrola naprieč monorepom         |
| `pnpm test`         | unit/e2e testy naprieč monorepom          |
| `pnpm format`       | formátovanie cez Prettier                 |

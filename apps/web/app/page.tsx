import Link from "next/link";
import { Button } from "@hk/ui";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-start gap-6 px-6 py-24">
      <h1 className="text-3xl font-bold">Hypotekárna kalkulačka 2.0</h1>
      <p className="text-gray-600">
        Spočítajte si mesačnú splátku, RPMN a overte, či vaša hypotéka spĺňa limity NBS (LTV,
        DSTI) – na základe aktuálnych ponúk bánk.
      </p>
      <Link href="/kalkulacka">
        <Button>Spustiť kalkulačku</Button>
      </Link>
    </main>
  );
}

/**
 * Zjednodušené regulačné limity NBS pre hypotekárne úvery.
 * Skutočné opatrenie NBS sa v čase mení (LTV pásma, výnimky pre mladých do 35 rokov a pod.) –
 * pozri docs/nbs-regulation-notes.md, kde sa sleduje aktuálne znenie a dôvod nastavenia hodnôt.
 */
export const NBS_MAX_LTV_PCT = 90;
export const NBS_MAX_DSTI_PCT = 60;

export function isWithinNbsLimits(ltvPct: number, dstiPct: number): boolean {
  return ltvPct <= NBS_MAX_LTV_PCT && dstiPct <= NBS_MAX_DSTI_PCT;
}

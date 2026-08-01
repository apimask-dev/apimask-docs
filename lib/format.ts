/** Small number as an English word, for display copy.
 *
 *  Headlines on the homepage state how many products and categories are live.
 *  Those numbers were hardcoded into the copy ("Three products…", "Seven live
 *  categories…") and silently went stale as the catalog grew, so they are now
 *  derived from lib/products.ts and spelled here to keep the display type
 *  reading as prose. Falls back to a numeral past nine. */
const NUMBER_WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];

export function spellCount(value: number): string {
  return NUMBER_WORDS[value] ?? String(value);
}

export function spellCountLower(value: number): string {
  return spellCount(value).toLowerCase();
}

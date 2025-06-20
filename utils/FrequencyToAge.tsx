
export function frequencyToEarAge(low: number, high: number): number {
  // Αυτός είναι ένας απλός υπολογισμός βασισμένος σε έρευνες για τη μείωση ακοής με την ηλικία.
  // Είναι ενδεικτικός και μόνο για διασκεδαστική χρήση.

  let age = 18;

  if (high < 8000) age = 70;
  else if (high < 10000) age = 60;
  else if (high < 12000) age = 50;
  else if (high < 14000) age = 40;
  else if (high < 16000) age = 30;
  else if (high < 18000) age = 25;
  else if (high < 20000) age = 20;

  // Προσαρμογή βάση του χαμηλότερου εύρους ακοής
  if (low > 200) age += 5;
  if (low > 400) age += 5;

  return age;
}

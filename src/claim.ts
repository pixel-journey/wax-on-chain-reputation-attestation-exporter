/**
 * A reputation claim the caller typed.
 * Not signed and not stored on chain.
 */

const NAME = /^(?!.*\.\.)(?!\.)(?!.*\.$)[a-z1-5.]{1,12}$/;

export type Claim = { subject: string; score: number };

export function claim(subject: string, score: number): { ok: false; reason: string } | { ok: true; claim: Claim } {
  if (!NAME.test(subject)) return { ok: false, reason: "subject is not an account" };
  if (!Number.isInteger(score) || score < 0 || score > 100) return { ok: false, reason: "score must be an integer from 0 to 100" };
  return { ok: true, claim: { subject, score } };
}

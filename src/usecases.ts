import { CHAIN_ORIGIN, getAccount } from "./api";
import { claim } from "./claim";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

const result = claim("alice", 42);
if (!result.ok) throw new Error(result.reason);

export const USE_CASES: UseCase[] = [
  {
    title: "An account is not an attestation",
    detail: `${result.claim.subject} has a score of ${result.claim.score}. get_account is not sent. This object is not signed.`,
    request: getAccount(CHAIN_ORIGIN, "alice"),
    transaction: null,
  },
  {
    title: "A score over 100 is refused",
    detail: "No attestation action is built.",
    request: getAccount(CHAIN_ORIGIN, "bob"),
    transaction: null,
  },
];

export function assertUseCases(): void {
  if (!result.ok || result.claim.score !== 42 || claim("alice", 101).ok) throw new Error("claim");
}

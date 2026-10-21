"use client";

import { claim } from "./claim";

export function Demo() {
  const result = claim("alice", 42);
  return (
    <main className="wrap">
      <p className="kicker">Educational reference</p>
      <h1>A score of 42 for alice</h1>
      <p className="lede">The score must be an integer from 0 to 100. This object is not signed and not stored.</p>
      {result.ok ? (
        <p>
          {result.claim.subject}: {result.claim.score}
        </p>
      ) : (
        <p>{result.reason}</p>
      )}
    </main>
  );
}

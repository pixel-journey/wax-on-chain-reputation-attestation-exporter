import { describe, expect, it } from "vitest";
import { claim } from "./claim";

describe("reputation claim", () => {
  it("keeps a score in range and refuses a bad name", () => {
    expect(claim("alice", 42)).toEqual({ ok: true, claim: { subject: "alice", score: 42 } });
    expect(claim("alice", 101).ok).toBe(false);
    expect(claim("Alice", 10).ok).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import { claim } from "./claim";

describe("reputation claim", () => {
  it("keeps 0 and 100 and refuses 101", () => {
    expect(claim("alice", 0)).toEqual({ ok: true, claim: { subject: "alice", score: 0 } });
    expect(claim("alice", 100)).toEqual({ ok: true, claim: { subject: "alice", score: 100 } });
    expect(claim("alice", 42)).toEqual({ ok: true, claim: { subject: "alice", score: 42 } });
    expect(claim("alice", 101)).toEqual({
      ok: false,
      reason: "score must be an integer from 0 to 100",
    });
    expect(claim("alice", 1.5).ok).toBe(false);
    expect(claim("Alice", 10)).toEqual({ ok: false, reason: "subject is not an account" });
    expect(claim("a".repeat(12), 10).ok).toBe(true);
    expect(claim("a".repeat(13), 10).ok).toBe(false);
  });
});

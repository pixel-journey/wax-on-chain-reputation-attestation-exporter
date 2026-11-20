# Education — a typed score, not an attestation

> **Rung:** `npm test` passes. The claim is not signed and not stored.  
> **The test is the rule.** A salted disclosure is [wax-verifiable-credential-patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns). This file does not hash.

Official context: [docs.wax.io](https://docs.wax.io/).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Keep 0 and 100; refuse 101 |
| Intermediate | Explain the Antelope-style subject name bound |
| Masterclass | Refuse to call the object a signed attestation |

---

## Beginner — one scene

| Call | Locked result |
| --- | --- |
| `alice`, `0` | ok |
| `alice`, `42` | ok |
| `alice`, `100` | ok |
| `alice`, `101` or `1.5` | not ok. Reason: `score must be an integer from 0 to 100` |
| `Alice` | not ok. Reason: `subject is not an account` |
| 12 `a` characters | ok |
| 13 `a` characters | not ok |

A score of 100 is allowed. 101 is not. Nothing here is a signature.

```bash
npm test
```

---

## Intermediate — shapes

| Field | Rule |
| --- | --- |
| subject | `a-z` / `1-5` / `.`, length 1..12, no leading/trailing/doubled `.` |
| score | integer 0 .. 100 inclusive |

The name regex is looser than [px-invariant-kit](https://github.com/pixel-journey/px-invariant-kit) (dots allowed mid-name). Do not merge without a test.

---

## Masterclass

### Common mistakes

1. Treating score 100 as "verified on chain."  
2. Signing in the UI and still citing this pure function.  
3. Accepting floats (1.5) by truncating.  
4. Confusing this with salted selective disclosure in the VC patterns lab.

### Exercises

1. Is score 0 valid? (Yes.)  
2. Is `Alice` valid? (No.)  
3. Does this return a signature field? (No.)

---

## What this course will not teach

- Cryptographic attestation
- On-chain reputation tables
- That a high score is earned gameplay

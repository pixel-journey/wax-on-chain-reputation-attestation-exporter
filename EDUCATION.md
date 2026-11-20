# Education — a typed score, not an attestation

> **Rung:** `npm test` passes. The claim is not signed and not stored.  
> **The test is the rule.** A salted disclosure is [wax-verifiable-credential-patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns). This file does not hash.

## Predict, then run

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

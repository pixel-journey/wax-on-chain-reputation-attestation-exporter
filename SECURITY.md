# Security — typed reputation claim

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Score outside 0..100 or non-integer | refused |
| Bad subject name | refused |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Signature | None — do not treat as attestation |
| Storage | Not written |
| Who sets the score | Caller-typed integer only |

## Attack angles

1. Publishing score 100 as proof of skill.  
2. Capitalized account names accepted by a looser port.  
3. Replacing this object with a VC without new tests.

## Honesty limits

No network. No wasm. No hash. [docs.wax.io](https://docs.wax.io/) · [VC patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns).

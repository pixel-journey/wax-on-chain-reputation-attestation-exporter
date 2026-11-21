# Security — typed reputation claim

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Score outside **0..100** or non-integer | refused |
| Bad subject name | refused |
| Score 0 and 100 | allowed |
| Capitalized `Alice` | not an account |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Signature | None — do not treat as attestation |
| Storage | Not written |
| Who sets the score | Caller-typed integer only |
| On-chain table | Not this product |

## Attack angles

1. Publishing score 100 as proof of skill.  
2. Capitalized account names accepted by a looser port.  
3. Replacing this object with a VC without new tests.  
4. Truncating floats (1.5) instead of refusing.  
5. Claiming the object was signed on WAX.

## Honesty limits

No network. No wasm. No hash. No signature field.

| Sibling | Distinction |
| --- | --- |
| [VC patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns) | Salted selective disclosure |
| [ZK interface](https://github.com/pixel-journey/wax-client-side-zk-attestation-interface) | Proof always false (teaching) |

[docs.wax.io](https://docs.wax.io/).

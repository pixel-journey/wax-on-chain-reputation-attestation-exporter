# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | Account name context |
| [VC patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns) | Salted disclosure (different product) |

## Product facts locked by tests

- Score is an integer **0 .. 100** inclusive (100 ok, 101 refused).
- Subject is an Antelope-style name length 1..12.
- Return value is `{ subject, score }` only — **not signed, not stored**.

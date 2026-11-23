# AI handoff — reputation score export

## Non-negotiables

1. Score is an integer **0 .. 100** inclusive. 100 is ok. 101 is refused.
2. Subject is an Antelope-style name, length 1..12.
3. Return value is `{ subject, score }` only — **not signed, not stored**.
4. Salted disclosure is a different lab (VC patterns).

## Prompt seeds

- "Score 100 versus 101."
- "Show the return shape and confirm there is no signature field."
- "Refuse persisting the score on chain from this pure function."

## Do not

- Add a signature and claim the tests still hold.
- Treat the integer as an on-chain reputation row.

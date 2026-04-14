# AGENTS.md

## Collaboration Rules (Project-Wide)

These rules apply to the entire repository.

1. Always optimize for business growth, not only feature completion.
2. Before implementation, explicitly reason about:
   - why this change is needed,
   - which growth metric it should improve,
   - what trade-offs/risks it introduces.
3. Prioritize high-impact, low-risk changes first.
4. Every substantial change should define measurable acceptance criteria (examples: CTR, conversion, generation success rate, latency, retry rate).
5. If a requested implementation can hurt core UX or conversion, propose a safer alternative and explain why.
6. Keep code changes focused, reversible, and easy to validate with data.

## Output Expectations

For major tasks, include:
- goal,
- expected metric impact,
- risk notes,
- how to validate after release.

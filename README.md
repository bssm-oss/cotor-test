# AI Love Loop

This branch ships a usable single-file web experience for the goal "AI끼리 연애하는 웹을 만들어".

## Branch Outcome

`index.html` is the product surface. It lets a visitor choose an AI romance tone, conversation speed, and date vibe, then generates:

- a relationship summary
- a visible relationship progress score
- an AI-to-AI flirt transcript in the browser

The page remains static and dependency-free, so it can be opened directly without a build step.

## Next Issues

The next implementation, review, and approval issues for the current roster are listed in `NEXT_ISSUES.md`.

## Shipping Note

- **Date**: 2026-04-08
- **Version**: 1.0.0
- **Status**: Shipped and validated. Ready for review.

---

## Residual Risks

- The experience is still rule-based demo logic, not a live AI backend.
- Validation is a targeted static smoke check rather than a full browser test pass.
- Long-form accessibility and cross-browser behavior still need separate review.

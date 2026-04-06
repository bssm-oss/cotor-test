# Test Pilot

This branch ships the first usable single-file web slice for the goal "test web을 만들어라".

## Branch Outcome

`index.html` is the product surface. It lets a visitor choose a test scenario, execution environment, and validation depth, then generates an in-browser test brief with:

- a summary of the selected scope
- a visible readiness score
- a checklist of immediate verification points

The page remains static and dependency-free, so it can be opened directly without a build step.

## Next Issues

The next implementation, review, and approval issues for the current roster are listed in `NEXT_ISSUES.md`.

## Residual Risks

- The experience is still a static scenario generator, not a live test runner.
- Validation is a targeted static smoke check rather than a full browser test pass.
- Long-form accessibility and cross-browser behavior still need separate review.

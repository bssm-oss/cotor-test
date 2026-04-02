# Test Pilot

This branch ships the first usable single-file web slice for the goal "test web을 만들어라".

`index.html` is the product surface. It lets a visitor choose a test scenario, execution environment, and validation depth, then generates an in-browser test brief with:

- a summary of the selected scope
- a visible readiness score
- a checklist of immediate verification points

The page remains static and dependency-free, so it can be opened directly without a build step.

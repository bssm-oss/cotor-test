# Cotor Talk

This branch ships a usable single-file web experience for the goal "카톡 웹을 만드시오".

## Branch Outcome

`index.html` is the product surface. It provides:

- a Kakao-style chat room list
- room switching across multiple conversation contexts
- quick reply chips plus direct message entry
- immediate in-browser reply simulation without a build step

The page remains dependency-free, so it can be opened directly in a browser.

## Next Issues

The next implementation, review, and approval issues for the current roster are listed in `NEXT_ISSUES.md`.

## Residual Risks

- The messenger behavior is still a static prototype rather than a real-time backend.
- Validation is a targeted smoke check, not a full browser automation pass.
- Persistence, attachments, and notification behavior still need separate implementation.

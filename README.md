# KakaoTalk Web

This branch ships a usable single-file KakaoTalk web clone for the goal "카톡 웹을 만드시오".

## Branch Outcome

`index.html` is the product surface. It provides:

- **Chat list sidebar** with search, tab switching (채팅/친구), unread badges, and active state
- **Chat room view** with message bubbles (sent/received), date dividers, read receipts, and auto-scroll
- **Message sending** with Enter-to-send, Shift+Enter for newline, and auto-resizing textarea
- **Connection state management** — visible connection bar (connected/disconnected/reconnecting) with exponential-backoff reconnection logic
- **Error handling** — ErrorBoundary for runtime errors, SafeDOM guards for missing elements, message send queue with retry on failure, localStorage persistence with graceful degradation on storage quota exceeded
- **Toast notifications** for connection loss, send failures, and storage warnings
- **Mobile responsive** layout with sidebar/chat toggle and back navigation

The page remains static and dependency-free, so it can be opened directly without a build step.

## Next Issues

The next implementation, review, and approval issues for the current roster are listed in `NEXT_ISSUES.md`.

## Residual Risks

- Message send simulation uses `Math.random()` for failure injection (15% rate); real network behavior would differ.
- No WebSocket or HTTP backend — all communication is simulated client-side.
- localStorage persistence lacks migration strategy; schema changes would lose data.
- Cross-browser behavior (especially older Safari/Edge) has not been tested.
- Accessibility beyond basic ARIA attributes and focus states has not been audited.

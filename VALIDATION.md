Validation rerun: 2026-04-04

Scope
- Branch outcome for the goal "카톡 웹을 만드시오"

Validation commands
- `node server/index.test.js` → All store tests passed.
- Integration smoke test (create room → send message → list messages → error cases) → All endpoints returned expected status codes and payloads.

Endpoints verified
- POST /api/rooms → 201 with room object
- GET /api/rooms → 200 with room list
- POST /api/rooms/:id/messages → 201 with message object
- GET /api/rooms/:id/messages → 200 with message array
- POST /api/rooms/:id/messages (missing text) → 400
- GET /api/unknown → 404

Result
- The backend delivers a working REST API for chat rooms and messages.
- Zero external dependencies — uses only Node.js built-in `node:http`.
- In-memory store with proper isolation (structuredClone on all reads).
- Server does not auto-listen when imported as a module, enabling testability.

Residual risk
- No persistence layer — all data is lost on server restart.
- No authentication, rate limiting, or input sanitization beyond basic validation.
- No WebSocket support; real-time messaging would require client polling.
- No CORS headers configured for cross-origin frontend access.

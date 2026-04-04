# 카톡 웹 (KakaoTalk Web)

This branch ships the first implementation slice for a KakaoTalk-like web messaging app.

## Branch Outcome

### Frontend — `index.html`
A single-file web UI (from the previous goal) that can be opened directly in a browser.

### Backend — `server/`
A zero-dependency Node.js API server providing:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/rooms` | Create a chat room |
| `GET` | `/api/rooms` | List all rooms |
| `POST` | `/api/rooms/:id/messages` | Send a message |
| `GET` | `/api/rooms/:id/messages` | Get room messages |

Start with `node server/index.js` (default port 3100, configurable via `PORT`).

## Next Issues

See `NEXT_ISSUES.md`.

## Residual Risks

- In-memory store — data is lost on restart.
- No authentication or authorization layer.
- No WebSocket / real-time push; clients must poll.
- Validation is a smoke test, not a full test matrix.

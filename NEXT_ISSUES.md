# Next Issues

1. Implementation issue
   - Title: Add persistence and WebSocket real-time messaging
   - Scope: Replace in-memory store with SQLite or file-based persistence. Add WebSocket endpoint for real-time message push. Update CORS headers for frontend access.
   - Expected outcome: Messages survive server restarts and clients receive new messages in real time.

2. Review issue
   - Title: QA review persistence and WebSocket integration
   - Scope: Verify data survives restart, confirm WebSocket delivers messages to connected clients in real time, validate CORS allows frontend origin.
   - Expected outcome: QA confirms persistence and real-time messaging work without regressing REST API behavior.

3. Approval issue
   - Title: CEO approve persistence and WebSocket hardening
   - Scope: Review QA evidence and decide whether to ship or continue (e.g., add auth, rate limiting, message search).
   - Expected outcome: Approval decision based on demonstrated reliability gains.

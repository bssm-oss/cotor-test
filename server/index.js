import { createServer } from "node:http";
import { Store } from "./store.js";

const store = new Store();

async function createRoom(req, body) {
  const name = body.name || "Unnamed Room";
  const room = store.createRoom(name);
  return { status: 201, data: room };
}

async function listRooms() {
  return { status: 200, data: store.listRooms() };
}

async function getMessages(req) {
  const roomId = req.url.split("/")[3];
  const messages = store.getMessages(roomId);
  if (messages === null) return { status: 404, data: { error: "Room not found" } };
  return { status: 200, data: messages };
}

async function addMessage(req, body) {
  const roomId = req.url.split("/")[3];
  const sender = body.sender || "Anonymous";
  const text = body.text || "";
  if (!text) return { status: 400, data: { error: "text is required" } };
  const msg = store.addMessage(roomId, sender, text);
  if (!msg) return { status: 404, data: { error: "Room not found" } };
  return { status: 201, data: msg };
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

const routes = {
  "POST /api/rooms": createRoom,
  "GET /api/rooms": listRooms,
  "GET /api/rooms/:id/messages": getMessages,
  "POST /api/rooms/:id/messages": addMessage,
};

const routePatterns = Object.entries(routes).map(([pattern, handler]) => ({
  pattern,
  segments: pattern.split(" ")[1].split("/"),
  method: pattern.split(" ")[0],
  handler,
}));

const server = createServer(async (req, res) => {
  const path = req.url.split("?")[0];
  const pathSegments = path.split("/");
  const matched = routePatterns.find(
    (r) =>
      r.method === req.method &&
      r.segments.length === pathSegments.length &&
      r.segments.every((seg, i) => seg.startsWith(":") || seg === pathSegments[i])
  );

  if (!matched) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Not found" }));
  }

  try {
    const body = req.method !== "GET" ? await readBody(req) : {};
    const result = await matched.handler(req, body);
    res.writeHead(result.status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result.data));
  } catch (e) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: e.message }));
  }
});

const PORT = parseInt(process.env.PORT || "3100", 10);
if (process.argv[1] === new URL(import.meta.url).pathname) {
  server.listen(PORT, () => {
    console.log(`KakaoTalk web backend listening on http://localhost:${PORT}`);
  });
}

export { server };

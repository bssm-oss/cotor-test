const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT) || 3000;
const root = __dirname;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8"
};

function getResponse(requestUrl) {
  const requestPath = requestUrl === "/" ? "/index.html" : requestUrl || "/index.html";
  const filePath = path.join(root, requestPath.replace(/\?.*$/, ""));
  const safePath = path.normalize(filePath);

  if (!safePath.startsWith(root)) {
    return {
      statusCode: 403,
      body: "Forbidden",
      contentType: "text/plain; charset=utf-8"
    };
  }

  try {
    const file = fs.readFileSync(safePath);
    const ext = path.extname(safePath);
    return {
      statusCode: 200,
      body: file,
      contentType: contentTypes[ext] || "application/octet-stream"
    };
  } catch {
    return {
      statusCode: 404,
      body: "Not Found",
      contentType: "text/plain; charset=utf-8"
    };
  }
}

function createServer() {
  return http.createServer((req, res) => {
    const response = getResponse(req.url);
    res.writeHead(response.statusCode, {
      "Content-Type": response.contentType
    });
    res.end(response.body);
  });
}

if (require.main === module) {
  const server = createServer();
  server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
  });
}

module.exports = {
  createServer,
  getResponse
};

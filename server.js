const http = require("http");
const fs = require("fs");
const path = require("path");

const host = "127.0.0.1";
const port = Number(process.env.PORT || 3000);
const rootDir = __dirname;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

function createRequestHandler(baseDir = rootDir) {
  return (req, res) => {
    const pathname = new URL(req.url || "/", "http://localhost").pathname;
    const requestPath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const filePath = path.join(baseDir, path.normalize(requestPath));

    if (!filePath.startsWith(baseDir)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, file) => {
      if (error) {
        res.writeHead(error.code === "ENOENT" ? 404 : 500, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        res.end(error.code === "ENOENT" ? "Not found" : "Server error");
        return;
      }

      const extension = path.extname(filePath);
      res.writeHead(200, {
        "Content-Type": contentTypes[extension] || "application/octet-stream",
      });
      res.end(file);
    });
  };
}

function createServer() {
  return http.createServer(createRequestHandler());
}

if (require.main === module) {
  const server = createServer();
  server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
}

module.exports = {
  createRequestHandler,
  createServer,
};

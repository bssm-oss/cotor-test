const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT) || 3000;
const indexPath = path.join(__dirname, "index.html");

const handleRequest = (req, res) => {
  if (req.url !== "/" && req.url !== "/index.html") {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
    return;
  }

  const html = fs.readFileSync(indexPath, "utf8");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
};

const startServer = () => {
  const server = http.createServer(handleRequest);

  server.on("error", (error) => {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  });

  server.listen(port, host, () => {
    console.log(`Landing page available at http://${host}:${port}`);
  });
};

if (require.main === module) {
  startServer();
}

module.exports = { handleRequest, startServer };

import http from "http";
import fs from "fs/promises";
import path from "path";
import url from "url";
const PORT = process.env.PORT;
// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a server
const server = http.createServer(async (req, res) => {
  // res.setHeader("Content-Type", "text/html");
  //res.statusCode = 404;
  //console.log(req.url);
  //console.log(req.method);

  try {
    // check if GET method REQUESTED
    if (req.method === "GET") {
      let filePath;
      if (req.url == "/") {
        filePath = path.join(__dirname, "public", "index.html");
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
      } else {
        throw new Error("Not found");
      }
      const data = await fs.readFile(filePath);
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server Error>");
  }
});

//res.writeHead(200, { "Content-Type": "text/html" });
//res.end("<h1>Hello how are you!</h1>");

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

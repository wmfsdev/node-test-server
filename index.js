const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  const filename = "." + q.pathname;
  
  // Extension and Content type
  let extname = path.extname(filename)
  let contentType = "text/html"
 
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
  }

  if (filename === "./") filename = "index.html";

  fs.readFile(filename, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile('404.html', (err, content) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(content, "utf8");
        })
      } else {
        //  Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, {'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
}).listen(8080);
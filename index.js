const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (req, res) {
  const q = url.parse(req.url, true);
  const filename = "." + q.pathname;

  fs.readFile(filename, function(err, data) {
    if (req.url === '/') {
      fs.readFile('index.html', (err, content) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content, "utf8");
      })
    }
    else if (err) {
      fs.readFile('404.html', (err, content) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(content, "utf8");
      })
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    } 
  });
}).listen(8080);
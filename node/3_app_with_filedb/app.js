// Listing 6 - 8. Final example server
var http = require('http');
var employeeService = require('./lib/employee');
var responder = require('./lib/responseGenerator');
var staticFile = responder.staticFile('/public');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // A parsed url to work with in case there are parameters
  var _url;
  // In case the client uses lower case for methods.
  req.method = req.method.toUpperCase();
  console.log(req.method + ' ' + req.url);
  if (req.method !== 'GET') {
    res.writeHead(501, {
      'Content-Type': 'text/plain'
    });
    return res.end(req.method + ' is not implemented by this ➥server.');
  }
  if (_url = /^\/employees$/i.exec(req.url)) {
    employeeService.getEmployees(function (error, data) {
      if (error) {
        return responder.send500(error, res);
      }
      return responder.sendJson(data, res);
    });
  } else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
    // then added
    employeeService.getEmployee(_url[1], function (error, data) {
      if (error) {
        return responder.send500(error, res);
      }
      if (!data) {
        return responder.send404(res);
      }
      return responder.sendJson(data, res);
    });
  }
  else {
    // try to send the static file
    res.writeHead(200);
    res.end('static file maybe');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
// Listing 6 - 8. Final example server
var http = require('http');
// require('./lib/connection');
/* ########################## connect to database #####################################*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb', {useMongoClient: true});

// Close the Mongoose connection on Control+C
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected');
        process.exit(0);
    });
});
require('./models/employee');
require('./models/department');


var Employee = mongoose.model('Employee');

/* ########################## server #####################################*/
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
    Employee.find().sort('name').exec(function (error, data) {
      console.log("get employees ...\r\n");
      // console.log(data);
      if (error) {
        console.error(data.red);
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        return res.end(data);
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      return res.end(JSON.stringify(data));
    });

  } else if (_url = /^\/employees\/(\w+)$/i.exec(req.url)) {
    // then added
    console.log(_url[1]);
    Employee.findById(_url[1]).populate('departmentId').exec(function (error, data) {
      if (error) {
        console.error(data.red);
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        return res.end(data);
      }
      if (!data) {
        console.error("Resource not found");
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        return res.end('Not Found');
        // return res.send404(res);
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      return res.end(JSON.stringify(data));
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
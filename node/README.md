# Table of Contents
1. [Installing Node.js](#installing-nodejs)
1. [Your First Node.js Server](#your-first-nodejs-server)
1. [npm](#npm)
1. [Writing Module](#writing-module)
1. [Asynchronous Coding](#asynchronous-coding)
1. [Core Modules](#core-modules)
1. [Interacting with MongoDB Using Mongoose](#interacting-with-mongodb-using-mongoose)

# Installing Node.js
1. download LTS version from the [Node.js website](https://nodejs.org/en/)
1. open a terminal and type 
    ```shell
    node -v
    ```
1. REPL (Read-Eval-Print Loop)
    - REPL Gives you a JavaScript sandbox to play in. 
    - It can be treated as a Node.js script file, and all the usual functions and modules are available in this environment 
    - Launching:
        - Open terminal, type node and press enter. 
        - The terminal input character will change to >

# Your First Node.js Server
1. Create a file named "app.js", and paste the following code:
    ```javascript
    const http = require('http');
    
    const hostname = '127.0.0.1';
    const port = 3000;
    
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    });
    
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
    ```
1. After that, run your web server using 
    ```shell
    node app.js
    ```
1. Visit __[http://localhost:3000](http://localhost:3000)__

    You will see a message 'Hello World'
    
# npm
useful commands
1. __npm install__ simply executing npm install will install all the modules listed in the __package.json__ file in the current directory. 
1. Global versus Local Installations 
    ```shell
    npm install
    ```
1. __npm install < name >__ tries to install the most recent version of the module <name> into the local node_modules folder. 
1. Global versus Local Installations 
    ```shell
    npm install express-generator –global
    ```
1. __npm search <name>__
    ```shell
        npm search markdown 
    ```
1. __npm docs < name >__
    ```shell
        npm docs markdown 
    ```
    
# Writing Module
1. Save the code bellow in a file called _myfirstmodule.js_
    ```javascript
    exports.myDateTime = function () {
        return Date();
    };
    ```
1. Include Your Own Module
    ```javascript
    var dt = require('./myfirstmodule');
    ```
    
    
# Asynchronous Coding
1. Callback Functions
    ```javascript
    var fs = require('fs');
    fs.readFile('README.txt', 'utf8', function(error, data) {
      if (error) {
           return console.error(error);
      }
      console.log(data);
    });
    ```

1. Event Emitters
    ```javascript
    var events = require('events');
    var EventEmitter = events.EventEmitter;
    var emitter = new EventEmitter();
    emitter.emit('start');
    emitter.emit('count', 1);
    emitter.emit('count', 2);
 
       
    // listening for events
    emitter.on('start', function() {
      console.log('start event');
    }); 
    
    emitter.on('count', function(count) {
      console.log('count = ' + count);
    });
    ```

1. Promises
    - Creating a promise
        ```javascript
        var promise = new Promise(function(resolve, reject) {
           var success = true;
           if (success) {
               resolve('promise fulfilled');
           } else {
               reject(new Error('promise rejected'));
           }   
        });
        ````
    - Using calback vs Using promises with asynchronous code.
        
        ```javascript
        // callback example
        var fs = require('fs');
        fs.readFile('README.txt', 'utf8', function(error, data) {
          if (error) {
              return console.error(error);
          }
          console.log(data);      
        });
       ```
        
       ```javascript
       // same code above using promise
       var fs = require('fs');
       var promise = new Promise(function(resolve, reject) {
         fs.readFile('README.txt', 'utf8', function(error, data) {
           if (error) {
             return reject(error);
           }
           resolve(data);
         });
       });
         
        // handling promise
        promise.then(function(result) {
          console.log(result);
        }, function(error) {
          console.error(error.message);
        });
       ```

    - Promise Chaining
        ```javascript
        promise.then(function(result) {
          console.log(result);
          return 'THE END!';
        }).then(function(result) {
          console.log(result);
        }); 
        ```
        You can also use the catch() method to handle rejections in a promise chain. 
        
# Core Modules
1. Command Line Arguments
    - All command line arguments passed to a Node application are available via the process.argv array.
    - The first two elements of this array are the node executable, followed by the name of the invoked JavaScript file. This means that the actual application arguments begin at process.argv[2] 
        ```javascript
        process.argv.forEach(function(value, index, args) {
          console.log('process.argv[' + index + '] = ' + value);
        }); 
        ```
      
1. Working with the File System
    1. The Current Working Directory
        - __process.pwd()__: This method takes no arguments, and returns a string representing the application’s working directory. 
        - __process.Chdir()__: This method change the current working directory. This method takes a single argument, a string representing the directory in which to change 
    1. Reading Files
    
        __readFile()__ and __readFileSync()__ methods
    
    1. Writing Files 
    
        __writeFile()__ and __writeFileSync()__ methods
    
    1. Readable File Streams 
        ```javascript
        var fs = require('fs');
        var stream = fs.createReadStream('foo.txt');
        stream.on('data', function(data) {
            var chunk = data.toString();
            process.stdout.write(chunk);
        });
        stream.on('end', function() {
            console.log();
        }); 
        stream.on('error', function(error) {
            console.error(error.message);
        }); 
        ```
    1. Writable File Streams
        ```javascript
        var fs = require('fs');
        var readStream = fs.createReadStream('foo.txt');
        var writeStream = fs.createWriteStream('bar.txt');
        readStream.pipe(writeStream);
        ```
1. The Standard Streams
    Node applications are connected to three standard streams by default. These streams are __stdin__, __stdout__, and __stderr__, and are accessible via the process object. 
    - The __console.log()__ and __console.error()__ family of methods are simple wrappers around calls to __process.stdout.write()__ and __process.stderr.write()__. 
        ```javascript
        process.stdin.once('data', function(data) {
            process.stdout.write('Hello ' + data.toString());
            process.stdin.pause();
        }); 
        process.stdout.write('What is your name?  ');
        process.stdin.resume();
        ```
    
    
# Interacting with MongoDB Using Mongoose
1. Adding Mongoose Models 
```shell
 npm install --save mongoose
```
1. adding models
    - create a directory named __models__ in the root of the application 
    - Inside the models directory, add two files: __employee.js__ and __department.js__ 
        - The Employee Model 
            ```javascript
            // Listing 9-2. Mongoose employee model
            var mongoose = require('mongoose');
            var Schema = mongoose.Schema;
            var EmployeeSchema = new Schema({
                id: {
                        type: Number,
                        required: true,
                        unique: true
                }, 
                name: {
                        type: String,
                        required: true
                }, 
                departmentId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Department'
                },
                image: {
                    type: String,
                    default: 'images/user.png'
                }
            });
            module.exports = mongoose.model('Employee', EmployeeSchema);
            ```
        - The Department Model 
            ```javascript
            var mongoose = require('mongoose');
            var Schema = mongoose.Schema;
            var DepartmentSchema = new Schema({
                name: {
                    type: String,
                    required: true
                }
            });
            
            module.exports = mongoose.model('Department', DepartmentSchema);
            ```
1. Populating the Database
    - use studio 3T
    - use mongoimport
        ```shell
        mongoimport  --collection employees --db mydb --file employees.json --jsonArray
        ```
        ```shell
        mongoimport  --collection departments --db mydb --file departments.json --jsonArray
        ```
1. Accessing the Database

    in index.js file add the following code
    ```javascript
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
    ```
    
    update create server as follows
    ```javascript
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
    ```
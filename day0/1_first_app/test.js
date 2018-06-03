// command line arguments
// process.argv.forEach(function (value, index, args) {
//     console.log('process.argv[' + index + '] = ' + value);
// });


// console.log('__filename: ' + __filename + '\r\n' );
// console.log('__dirname: ' + __dirname + '\r\n');

// current working directory
// console.log('process.pwd(): ' + process.cwd() + '\r\n');

// readable file steams
// const fs = require('fs');
// const stream = fs.createReadStream('foo.txt');
// stream.on('data', function (data) {
//     const chunk = data.toString();
//     process.stdout.write(chunk);
// });
// stream.on('end', function () {
//     console.log('\r\nstream ends\r\n');
// });
// stream.on('error', function (error) {
//     console.error(error.message);
// }); 

// writable file stream
// const fs = require('fs');
// const readStream = fs.createReadStream('foo.txt');
// const writeStream = fs.createWriteStream('bar.txt');
// readStream.pipe(writeStream);

// standard streams
// process.stdin.once('data', function (data) {
//     process.stdout.write('Hello ' + data.toString());
//     process.stdin.pause();
// });
// process.stdout.write('What is your name?  ');
// process.stdin.resume();

// callback functions
// const fs = require('fs');
// console.log('\r\calling readFile\r\n');
// fs.readFile('README4.txt', 'utf8', function (error, data) {
//     if (error) {
//         return console.error(error);
//     }
//     console.log(data);
// });
// console.log('\r\nafter calling\r\n');

// callback try/catch
// const fs = require('fs');
// console.log('\r\calling readFile\r\n');
// try {
//     fs.readFile('README4.txt', 'utf8', function (error, data) {
//         if (error) {
//             return console.error(error);
//         }
//         console.log(data);
//     });
// } catch (error) {
//     console.log('catch error');
// }
// console.log('\r\nafter calling\r\n');

// callback hell
// const fs = require('fs');
// const callback1 = function (error, data) {
//     if (error) {
//         return console.error(error);
//     }
//     console.log(data);
// };

// console.log('\r\calling readFile\r\n');
// fs.readFile('README.txt', 'utf8', callback1);
// console.log('\r\nafter calling\r\n');

// event emmiter
// const events = require('events');
// const EventEmitter = events.EventEmitter;
// const emitter = new EventEmitter();
// emitter.on('start', () => {
//     console.log('start event');
// });

// emitter.on('count', (count) => {
//     console.log('count = ' + count);
// });

// emitter.emit('start');
// emitter.emit('count', 1);
// emitter.emit('count', 2);

// promises
// creating promise
var promise = new Promise(function (resolve, reject) {
    var success = true;
    if (success) {
        resolve('promise fulfilled');
    } else {
        reject(new Error('promise rejected'));
    }
});

// promise's then() method
// promise.then(function (result) {
//     console.log(result);
// }, function (error) {
//     console.error(error.message);
// });

// promise chaining
promise.then(function (result) {
    console.log(result);
    return 'THE END!';
}).then(function (result) {
    console.log(result);
});
// var fs = require('fs');
// var promise = new Promise(function (resolve, reject) {
//     fs.readFile('README.txt', 'utf8', function (error, data) {
//         if (error) {
//             return reject(error);
//         }
//         resolve(data);
//     });
// }); 

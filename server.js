const EventEmitter = require("events");
const path = require("path");
const http = require("http");
const fs = require("fs");

const port = 3000;

const NewsLetter = new EventEmitter();

let chunks = [];

function serverRequestHandler(req, res) {
  req.on("data", function (chunk) {
    //--->listen for data event to be emitted
    chunks.push(chunk);
  });
  req.on("end", () => {
    //--->request ReadStream end event
    const { url, method } = req;
    const body = Buffer.concat(chunks).toString();
    //#13-->check url and method. if true decode
    if (url === "/newsletter_signup" && method === "POST") {
      //#14-->emit a signup event value passed is signup which
      //matches the Newsletter.on listener
      NewsLetter.emit("signup", JSON.parse(body)); //parse to use . notation
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(url + method);
      res.end();
    } else {
      //-->if method = "GET" message not found
      res.writeHead(404, { "Content-type": "text/html" });
      res.write("Your request is not found");
      res.end();
    }
  });
}
//on is listening for the NewsLetter emit in if statement
NewsLetter.on("signup", (contact) => {
  //from JSON.parse(body)
  //data can only be a string or a buffer in the fs.append
  //all callback functions that take in data require an err function
  fs.appendFile("NewsLetter.csv", `${contact.name},${contact.email}`, (err) => {
//if an error is thrown it will always break or stop the server in postman or anywhere else
    if (err) {
      console.log(err);
    }
  });
});

http
  .createServer(serverRequestHandler)
  .listen(port, console.log("Server listening on port: " + port));


// Windows PowerShell
// Copyright (C) Microsoft Corporation. All rights reserved.

// Try the new cross-platform PowerShell https://aka.ms/pscore6

// PS C:\Users\ceh71\repos\node_events> node server.js
// Server listening on port: 3000
// _http_server.js:255
//     throw new ERR_HTTP_INVALID_STATUS_CODE(originalStatusCode);
//     ^

// RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: { 'Content-Type': 'text/html' }
//     at ServerResponse.writeHead (_http_server.js:255:11)    at IncomingMessage.<anonymous> (C:\Users\ceh71\repos\node_events\server.js:18:13)
// PS C:\Users\ceh71\repos\node_events> node server.js
// PS C:\Users\ceh71\repos\node_events> node server.js
// Server listening on port: 3000
// undefined:1

// SyntaxError: Unexpected end of JSON input
//     at JSON.parse (<anonymous>)
//     at IncomingMessage.<anonymous> (C:\Users\ceh71\repos\node_events\server.js:22:43)
//     at IncomingMessage.emit (events.js:327:22)
//     at endReadableNT (internal/streams/readable.js:1327:12)
//     at processTicksAndRejections (internal/process/task_queues.js:80:21)
// PS C:\Users\ceh71\repos\node_events> node server.js
// Server listening on port: 3000
// C:\Users\ceh71\repos\node_events\server.js:36
//     fs.appendFile("NewsLetter.csv", `${contact.name},${contact.email}`, (err) => {//all callback functions
//     ^

// ReferenceError: fs is not defined
//     at EventEmitter.<anonymous> (C:\Users\ceh71\repos\node_events\server.js:36:5)
//     at EventEmitter.emit (events.js:315:20)
//     at IncomingMessage.<anonymous> (C:\Users\ceh71\repos\node_events\server.js:22:24)
//     at IncomingMessage.emit (events.js:327:22)
//     at endReadableNT (internal/streams/readable.js:1327:12)
//     at processTicksAndRejections (internal/process/task_queues.js:80:21)
// PS C:\Users\ceh71\repos\node_events> node server.js
// Server listening on port: 3000

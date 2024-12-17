// Create a web server
// Load the comments from the file comments.json
// Display the comments in the browser
// Add a form to add a comment
// When the form is submitted, add the comment to the file comments.json
// Display the comments in the browser
// Use the following command to start the server:
// node comments.js
// Use the following URL to open the server:
// http://localhost:3000

// Import the http module
var http = require('http');
// Import the fs module
var fs = require('fs');
// Import the url module
var url = require('url');
// Import the querystring module
var querystring = require('querystring');

// Create the server
http.createServer(function (req, res) {
    // Get the pathname
    var pathname = url.parse(req.url).pathname;
    // Get the query
    var query = url.parse(req.url).query;
    // Get the method
    var method = req.method;
    // Get the comments
    var comments = require('./comments.json');
    // Get the body
    var body = '';

    // Check if the pathname is /comments
    if (pathname === '/comments') {
        // Check if the method is GET
        if (method === 'GET') {
            // Display the comments
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>Comments</h1>');
            res.write('<ul>');
            comments.forEach(function (comment) {
                res.write('<li>' + comment + '</li>');
            });
            res.write('</ul>');
            res.end();
        }
        // Check if the method is POST
        if (method === 'POST') {
            // Set the encoding
            req.setEncoding('utf8');
            // Add the data event listener
            req.on('data', function (chunk) {
                body += chunk;
            });
            // Add the end event listener
            req.on('end', function () {
                // Get the comment
                var comment = querystring.parse(body).comment;
                // Add the comment
                comments.push(comment);
                // Write the comments to the file comments.json
                fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                // Display the comments
                res.writeHead(200, {'
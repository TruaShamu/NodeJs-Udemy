const http = require('http');

const express = require('express');

const app = express();

/*app.use('/',(req, res, next) => {
    console.log("First middleware!");
    next();
});

app.use('/',(req, res, next) => {
    console.log("Second middleware!");
    res.send("<p>Returning a response!</p>");
    next();
});*/

app.use('/users',(req, res, next) => {
    console.log("/users middleware!");
    res.send("<p>The middleware for /users!</p>");
});

app.use('/', ( req, res, next) => {
    console.log("/ middleware!");
    res.send("<p>The middleware for / .</p>");
});

app.listen(3000);
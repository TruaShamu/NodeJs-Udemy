const http = require('http');

const express = require('express');

const app = express();

app.use('/',(req, res, next) => {
    console.log("This always runs!");
    next();
})

app.use('/add-product',(req, res, next) => {
    console.log("In the middleware");
    res.send("<h1>The add product page<h1>");
    //next();
})

app.use('/', ( req, res, next) => {
    res.send("<h1>Hello from express js<h1>");
    console.log("In another middleware");
});
app.listen(3000);
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs')
app.set('views', 'views');

const users = [];

app.use(bodyParser.urlencoded({extended : true}));
app.get('/', (req, res, next) => {
    res.render('index', {pageTitle: 'Add User'});
});

app.get('/users', (req, res, next) => {
    res.render('users', {pageTitle: 'User', users: users});
});

app.post('/add-user', (req, res, next) => {
    console.log(req.body);
    users.push({name: req.body.name});
    res.redirect("/users");
});

app.listen(3000);
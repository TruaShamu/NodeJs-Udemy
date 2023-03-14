const path = require('path');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');


const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4())
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg') {
        return cb(null, true);
    } else {
        return cb(null, false);
    }
}

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.statusCode(status).json({ message: message, data: data });

})
const MONGODB_URI = 'mongodb+srv://Trua:asty0228@cluster0.uzeyt.mongodb.net/messages?w=majority'
mongoose.connect(MONGODB_URI).then(result => {
    app.listen(8080);
}).catch(err => console.log(err));

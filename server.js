var express = require('express');
var app = express();
var session = require('express-session');
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var uuid = require('node-uuid');
var multer        = require('multer');
var bodyParser = require('body-parser');
var cookieParser  = require('cookie-parser');
var mongoose      = require('mongoose');
var passport = require('passport');

var connectionString = 'mongodb://127.0.0.1:27017/form-maker';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connectionString =  process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(multer());
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get('/env', function(req, res){
    res.json(process.env);
});

require("./public/assignment/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);
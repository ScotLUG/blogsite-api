var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var model = require('./model/ModelLoader')
var requireAuth = require('./controller/RequireAuth')


var routes = require('./routes/index');
var users = require('./routes/user');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next();
})
app.use(express.static(path.join(__dirname, 'public')));


var testingData = function(req,res,next){
    model.Author.create({
        given_name: "Peter",
        family_name: "Kinnaird",
        gravatar: "",
        image_url: ""
    }).success(function(author){
        model.AuthorKey.create({
            key: "test",
            secret: "test",
            description: "TestKey"
        }).success(function(akey){
            author.addAuthorKey(akey).success(function(){
                next();
            })
            //akey.setAuthor(author).success(function(){
            //    console.log("Created a test author key");
            //    next();
            //})
        })
    })
}



app.use(testingData);
app.use('/', routes);
app.use('/users', users);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
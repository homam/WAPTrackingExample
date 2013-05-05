
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    ,emptygif = require('emptygif');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    // coffee script:
    app.use(require('connect-coffee-script')({
        src: __dirname + '/public' ,
        bare: true
    }));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.use(emptygif.emptyGif([{path:'/erreport', maxAge: 0}]))

// OR
app.get('/tracking_pixel.gif', function(req, res, next) {

    process.nextTick(function() {
        // do tracking stuff
    });

    emptygif.sendEmptyGif(req, res, {
        'Content-Type' : 'image/gif',
        'Content-Length' : emptygif.emptyGifBufferLength,
        'Cache-Control' : 'public, max-age=0' // or specify expiry to make sure it will call everytime
    });
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

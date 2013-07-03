var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , emptygif = require('emptygif');

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
    console.log(new Date());
    process.nextTick(function() {
        // do tracking stuff
    });

    emptygif.sendEmptyGif(req, res, {
        'Content-Type' : 'image/gif',
        'Content-Length' : emptygif.emptyGifBufferLength,
        'Cache-Control' : 'public, max-age=0' // or specify expiry to make sure it will call everytime
    });
});

app.get('/__nontracking_pixel.gif', function(req, res, next) {
    emptygif.sendEmptyGif(req, res, {
        'Content-Type' : 'image/gif',
        'Content-Length' : emptygif.emptyGifBufferLength,
        'Cache-Control' : 'public, max-age=0' // or specify expiry to make sure it will call everytime
    });
});

var pulls = {};
app.get('/issubscribed', function(req,res,next) {
    res.send('http://www.mozook.com/?vid='); 
});
app.post('/issubscribed', function(req, res, next) {
    var vid = +(req.body.vid || "0");
    if(!vid) {
        res.status(500);
        res.end();
    } else {
        pulls[vid] = (pulls[vid] || 0) + 1;
        if(pulls[vid] > 3) {
            res.send('http://www.mozook.com/?vid=' + vid); 
        } else {
            res.send('');
        }
    }
});

app.get('/directwap',  require('./routes/directwap.js').directwap);
app.get('/',  require('./routes/autoredir.js').autoredir);
app.get('/autoredir_inner', require('./routes/autoredir.js').autoredir_inner)
app.get('/autoredir_congrats', require('./routes/autoredir.js').autoredir_congrats)

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

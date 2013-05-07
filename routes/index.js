exports.index = function(req, res){
    var ua = req.headers['user-agent'];
    console.log(ua);
    res.render('index', { title: 'Express' });
};
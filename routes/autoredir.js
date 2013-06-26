exports.autoredir = function(req, res){
    var vid = Math.floor(Math.random() * 1000000);
    res.render('autoredir', { title: 'Express', vid: vid });
};

var pulls = {};
exports.autoredir_inner = function (req,res) {
    var vid = req.query.vid;
    if(!vid) {
        res.status(500);
        res.send('no vid provided!')
        res.end();
    } else {
        pulls[vid] = (pulls[vid] || 0) + 1;
        var congratsUrl = '';
        if(pulls[vid] >= 4) {
            congratsUrl = "/autoredir_congrats?vid=" + vid;
        }
        res.render('autoredir_inner', { title: 'Express', vid: vid, pulls: pulls[vid], congratsUrl: congratsUrl });   
    }
}

exports.autoredir_congrats = function (req, res) {
    res.send('Congratulations, you have subscribed!' + 
        '<br/><br/>Put Google AdWords pixel here, then redirect to the service page' +
        '<br/><br/><a href="/">Start Over</a>');
    res.end();
}
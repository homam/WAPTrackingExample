// this script must be just before < / body >



var pullServiceLink = function () {
    var iniframe = document.createElement("iframe"); //<iframe src="/autoredir_inner?vid=<%= vid %>"></iframe>
    iniframe.src = '/autoredir_inner?vid=' + VISITID;
    iniframe.width = '2';
    iniframe.height = '2'
    document.body.appendChild(iniframe);
};

var onMouseDownHandler = function(){
    setTimeout(pullServiceLink, 500);    
};

(function() {
    var $as = document.getElementsByTagName("a");
    for(var i = 0, l = $as.length; i<l; i++) {
        var $a = $as[i];
        var cname = $a.className;
        if(!cname || !cname.length)
            return;
        if(
                // only if conversion method is ClickTag or JavaApp:
                cname.indexOf('submethod-CLICKTAG') > -1 ||
                cname.indexOf('submethod-JAVA_APP') > -1
            ) {
            if(!!$a.addEventListener){
                $a.addEventListener("mousedown", onMouseDownHandler, false);
            } else {
                $a.onmousedown = onMouseDownHandler;
            }
        }
    }
    
})();




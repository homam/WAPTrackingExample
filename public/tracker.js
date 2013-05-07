// this script must be just before < / body >

(function() {
    var $as = document.getElementsByTagName("a");
    for(var i = 0, l = $as.length; i<l; i++) {
        var $a = $as[i];
        var cname = $a.className;
        if(!cname || !cname.length)
            return;
        if(
            cname.indexOf("track-click") > -1 &&
            (
                // only if conversion method is ClickTag or JavaApp fire the adword pixel this way:
                cname.indexOf('submethod-CLICKTAG') > -1 ||
                cname.indexOf('submethod-JAVA_APP') > -1
            )) {
            if(!!$a.addEventListener){
                $a.addEventListener("mousedown", trackAdWordsConv, false);
            } else {
                $a.onmousedown = trackAdWordsConv;
            }
        }
    }
})();

function trackAdWordsConv() {
    setTimeout(function() {
        try {
            var image = new Image(1,1);
            if("undefined" == typeof image.tagName) {
                image = document.createElement("img");
                image.width = 1;
                image.height = 1;
            }
            image.src = "http://www.googleadservices.com/pagead/conversion/1005094064/?value=0&amp;label=KbsBCMC0wAUQsImi3wM&amp;guid=ON&amp;script=0";
            image.setAttribute("src", image.src);
            document.body.appendChild(image);
        } catch (ex){
            alert(ex);
            if(!!window.console && !!window.console.log)
                window.console.log("error: ", ex);
        }
    },500);
}

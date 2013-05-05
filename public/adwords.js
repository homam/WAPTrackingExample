// this script must be just before < / body >

(function() {
    var $as = document.getElementsByTagName("a");
    for(var i = 0, l = $as.length; i<l; i++) {
        var $a = $as[i];
        if(($a.className || "").indexOf("adwords-conversion") >-1) {
            if(!!$a.addEventListener){
                $a.addEventListener("mousedown", trackConv, false);
            } else {
                $a.onmousedown = trackConv;
            }
        }
    }
})();

function trackConv() {
    try {
        var image = new Image(1,1);
        image.src = "/tracking_pixel.gif"; //"http://www.googleadservices.com/pagead/conversion/1005094064/?value=0&amp;label=KbsBCMC0wAUQsImi3wM&amp;guid=ON&amp;script=0";
        document.body.appendChild(image)
    } catch (ex){
        if(!!window.console && !!window.console.log)
            window.console.log("error: ", ex);
    }
}

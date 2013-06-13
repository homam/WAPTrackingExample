// this script must be just before < / body >

function sendRequest(url,callback,postData) {
    var req = createXMLHTTPObject();
    if (!req) return;
	var method = (postData) ? "POST" : "GET";
	req.open(method,url,true);
	//req.setRequestHeader('User-Agent','XMLHTTP/1.0');
	if (postData)
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	req.onreadystatechange = function () {
		if (req.readyState != 4) return;
		if (req.status != 200 && req.status != 304) {
			//alert('HTTP error ' + req.status);
			return;
		}
		callback(req);
	}
	if (req.readyState == 4) return;
	req.send(postData);
}

var XMLHttpFactories = [
	function () {return new XMLHttpRequest()},
	function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

function createXMLHTTPObject() {
	var xmlhttp = false;
	for (var i=0;i<XMLHttpFactories.length;i++) {
		try {
			xmlhttp = XMLHttpFactories[i]();
		}
		catch (e) {
			continue;
		}
		break;
	}
	return xmlhttp;
}


var pullServiceLink = function () {
    sendRequest('/issubscribed',function(req) {
        var res = req.responseText;
        if(!res || res.length == 0) {
            setTimeout(pullServiceLink, 500);
        } else {
            //TODO: redirect: location.href = res;
            alert('DONE!\n' + res);
        }
        }, "vid=" + VISITID);    
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




$(document).ready(function() {

    var title = document.title;
    var currentIP = '';

    function showIP()
    {
        if (currentIP == '') {
            chrome.runtime.sendMessage({"call": "getIP"}, function(r) {
                currentIP = r.ip;
                document.title = title + "  " + currentIP + " ";
            });
        } else {
            document.title = title + "  " + currentIP + " ";
        }
    }

    function hiddenIP()
    {
        document.title = title;
    }

    chrome.runtime.onMessage.addListener(function(request, sender, response) {
        if (typeof(request.call) === 'undefined') {
            return;
        }

        if (request.call == 'switcher') {
            if (request.status == 0) {
                hiddenIP();
            } else {
                showIP();
            }
        }
    });

    showIP();
});
var title = document.title;

function showIP()
{
    chrome.runtime.sendMessage({"call": "getIP"}, function(r) {
        document.title = title + "  " + r.ip + " ";
    });
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

$(document).ready(function() {
    showIP();
});
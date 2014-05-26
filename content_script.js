var ip = '';
var containerId = 'chrome_extension_web_ip_div';

function show() {
    if (ip == '') {
        chrome.runtime.sendMessage({"call": "getIP"}, function(r) {
            ip = r.ip;
            display();
        });
    } else {
        display();
    }
}

function hidden() {
    if (document.getElementById(containerId) != null) {
        document.getElementById(containerId).remove();
    }
}

function display() {
    var box = document.createElement('div');
    box.setAttribute('id', containerId)
    box.innerText = ip;
    document.body.appendChild(box);
}

chrome.runtime.onMessage.addListener(function(request, sender, response) {
    if (typeof(request.call) === 'undefined') {
        return;
    }
    console.log(request);

    if (request.call == 'switcher') {
        if (request.status == 0) {
            show();
            console.log('show');
        } else {
            console.log('hidden');
            hidden();
        }
    }
});

show();
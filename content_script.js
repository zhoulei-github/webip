var ip = '';
var containerId = 'chrome_extension_web_ip_div';
var classname = 'right';

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
    box.className = classname;
    document.body.appendChild(box);
    box.addEventListener('mouseover', function () {
        if (this.className == '' || this.className == 'right') {
            classname = 'left';
            this.className = classname;
        } else {
            classname = 'right';
            this.className = classname;
        }
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, response) {
    if (typeof(request.call) === 'undefined') {
        return;
    }

    if (request.call == 'switcher') {
        if (request.status == 0) {
            hidden();
        } else {
            show();
        }
    }
});

show();
var ipList = {},
    status = 1,
    messages = [
        "Enable",
        "Disable"
    ];

function getIp(url)
{
    if (typeof(ipList[url]) !== 'undefined') {
        return ipList[url];
    } else {
        return null;
    }
}

// Show action page
chrome.tabs.onUpdated.addListener(function(tabID) {
    chrome.pageAction.show(tabID);
});

// Record IPs
chrome.webRequest.onCompleted.addListener(function(details) {
    ipList[ details.url ] = details.ip;
    return;
}, {
    urls: ["http://*/", "https://*/"],
    types: []
}, []);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (typeof(sender.tab) === 'undefined' 
        || typeof(sender.tab.id) === 'undefined' 
        || sender.tab.id < 0
        || typeof(request.call) === 'undefined'
    ) {
        sendResponse({});
        return;
    }

    switch(request.call) {
        case "getIP": 
            var currentIP = getIp(sender.tab.url);
            sendResponse({
                ip : currentIP
            });
            break;
        default:
            sendResponse({});
    }
});

// Switcher
chrome.pageAction.onClicked.addListener(function(tab) {
    status = status == 0 ? 1 : 0;

    // Update title
    chrome.pageAction.setTitle({
        "tabId": tab.id,
        "title": messages[status]
    });

    // Update icon
    var iconPath = '';
    if (status == 0) {
        iconPath = "assets/page_icon_76x76_disable.png"
    } else {
        iconPath = "assets/page_icon_76x76.png"
    }
    chrome.pageAction.setIcon({
        "tabId": tab.id,
        "path": iconPath
    });

    // 
    chrome.tabs.sendMessage(tab.id, {"call": "switcher", "status": status});
});
function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        callback(tab.title, tab.url);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    getCurrentTabUrl(function (title, url) {
        var msgText = document.getElementById("msg_text");
        msgText.style.display = "none";
        var inputText = document.getElementById("md_format_url");
        var copyBtn = document.getElementById("btn_copy");
        var clipboard = new Clipboard('.btn');
        clipboard.on('success', function (e) {
            console.log(e);
            inputText.style.display = "none";
            copyBtn.style.display = "none";
            msgText.textContent = "success";
            msgText.style.display = "block";
        });
        clipboard.on('error', function (e) {
            console.log(e);
            alert(e);
        });
        title = title.replace(/[|\\`*_{}\[\]()#+\-.!]/g, '\\$&');
        inputText.value = "[" + title + "](" + url + ")";
        copyBtn.click();
    });
});
function ChangeURL(URL) {
    if (URL == 'Java') {
        document.getElementById("URL").innerText = "Questions/JavaBeginnerExampleQuestion.json";
    }
    if (URL == 'Python') {
        document.getElementById("URL").innerText = "Questions/PythonNormalExampleQuestion.json";
    }
    document.getElementById("Main").className = "ModeHidden"
    document.getElementById("Game").className = "ModeVisible";
}

function getJsonRequest(url) {
    var req = new XMLHttpRequest();
    var jsonObj;
    req.open("GET", url);
    req.onreadystatechange = function() {
        if(this.readyState == 4) {
            jsonObj = JSON.parse(this.response);
            processResults(jsonObj);
        }
    }
    req.send();
}

function processResults(jsonObj) {
    // TODO: replace with something else
    console.log(jsonObj);
}

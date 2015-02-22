function ChangeURL(URL) {
    if (URL == 'Java') {
        //document.getElementById("URL").innerText = "Questions/JavaBeginnerExampleQuestion.json";
        getJsonRequest("Questions/JavaBeginnerExampleQuestion.json");
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
    
    var id = document.getElementById.bind(document);
    var embedScript = id("embedScript");
    
    var q_array = jsonObj.Questions;
    var q = q_array[0];
    
    
    embedScript.src = "https://gist.github.com/adrianiainlam/2bfe1b8e70616eada426.js";
    
    var ans_array = q.Answers;
    
    id("Answer1").innerHTML = ans_array[0];
    id("Answer2").innerHTML = ans_array[1];
    id("Answer3").innerHTML = ans_array[2];
    id("Answer4").innerHTML = ans_array[3];
    
    id("Answer" + ans_array[4]).onclick = function() {
        alert("correct answer");
    }
    
}

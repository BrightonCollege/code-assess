var score = 0;

function ChangeMode(Mode) {
    document.getElementById("Main").className = "ModeHidden";
    if (Mode == 'Java') {
        document.getElementById("URL").innerText = "Questions/JavaBeginnerExampleQuestion.json";
        getJsonRequest("Questions/JavaBeginnerExampleQuestion.json");
    }
    if (Mode == 'Python') {
        document.getElementById("URL").innerText = "Questions/PythonNormalExampleQuestion.json";
    }
    if (Mode == 'Custom') {
        document.getElementById("custom").className = "ModeVisible";
        return;
    }
    document.getElementById("Game").className = "ModeVisible";
}

function goHome() {
    document.getElementById("Main").className = "ModeVisible";
    document.getElementById("Game").className = "ModeHidden";
    document.getElementById("custom").className = "ModeHidden";
    document.getElementById("Game Over").className = "ModeHidden";
}

function GameOverScreen() {
    document.getElementById("Game").className = "ModeHidden";
    document.getElementById("finalScore").className = score;
    //document.getElementById("finalTime").className = time;
    document.getElementById("Game Over").className = "ModeVisible";
}

function getJsonRequest(url) {
    var req = new XMLHttpRequest();
    var jsonObj;
    req.open("GET", url);
    req.onreadystatechange = function() {
        if(this.readyState == 4) {
            jsonObj = JSON.parse(this.response);
            processResults(jsonObj, 0);
        }
    }
    req.send();
}

function processResults(jsonObj, count) {
    if (count == 0) {score = 0;}
    var id = document.getElementById.bind(document);
    var embedScript = id("embedScript");
    var q_array = jsonObj.Questions;
    if (count == q_array.length) {
        //Show game over screen
        GameOverScreen();
    }
    var q = q_array[count];
    var gist = id("gist");
    
    var gisthtml = '<html><body><script src="https://gist.github.com/adrianiainlam/2bfe1b8e70616eada426.js"></script></body></html>';
    gist.contentDocument.open();
    gist.contentDocument.writeln(gisthtml);
    gist.contentDocument.close();
    
    UpdateScore();
    
    var ans_array = q.Answers;
    
    var correctAnswer = ans_array[4];
    
    id("Answer1").innerHTML = ans_array[0];
    id("Answer2").innerHTML = ans_array[1];
    id("Answer3").innerHTML = ans_array[2];
    id("Answer4").innerHTML = ans_array[3];

    for (i = 1; i < 5; i++) {
        if (i == correctAnswer) {
            id("Answer" + i).onclick = function () {
                alert("Correct answer");
                score++;
                processResults(jsonObj, count+1);
            };
        } else {
            id("Answer" + i).onclick = function () {
                alert("Wrong answer!");
                score--;
                processResults(jsonObj, count+1);
            };
        }
    }
}


function UpdateScore() {
    document.getElementById("score").innerHTML = score;
}

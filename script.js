var score = 0;
var time = 0;
var timer;
var LastMode; //will hold last mode choosen for the retry button, URL if custom
var Questions = new Array() //used in JSON parcing
function ChangeMode(Mode) {
    document.getElementById("Main").className = "ModeHidden";
    document.getElementById("Game Over").className = "ModeHidden";
    if (Mode == 'Java') {
        LastMode = 'Java';
        document.getElementById("URL").innerText = "Questions/JavaBeginnerExampleQuestion.json";
        getJsonRequest("Questions/JavaBeginnerExampleQuestion.json");
    }
    if (Mode == 'Python') {
        LastMode = 'Python';
        document.getElementById("URL").innerText = "Questions/PythonNormalExampleQuestion.json";
        getJsonRequest("Questions/PythonListComprehensionQs.json");
    }
    if (Mode == 'Player') {
        document.getElementById("custom").className = "ModeVisible";
        return;
    }
    if (Mode == 'Creator') {
        document.getElementById("creator").className = "ModeVisible";
        return;
    }
    if (Mode == 'AccessURL') {
            getJsonRequest(document.getElementById("userURL").value);
            return;
        }
    document.getElementById("Game").className = "ModeVisible";
}

function goHome() {
    clearInterval(timer);
    document.getElementById("Main").className = "ModeVisible";
    document.getElementById("Game").className = "ModeHidden";
    document.getElementById("custom").className = "ModeHidden";
    document.getElementById("Game Over").className = "ModeHidden";
    document.getElementById("creator").className = "ModeHidden";
}

function GameOverScreen() {
    document.getElementById("Game").className = "ModeHidden";
    document.getElementById("finalScore").innerHTML = score;
    document.getElementById("finalTime").innerHTML = time;
    document.getElementById("Game Over").className = "ModeVisible";
}

function getJsonRequest(url) {
    try {
    var req = new XMLHttpRequest();
    var jsonObj;
    req.open("GET", url);
    req.onreadystatechange = function() {
        if(this.readyState == 4) {
            jsonObj = JSON.parse(this.response);
            score = 0;
            time = 0;
            document.getElementById("time").innerHTML = 0;
            timer = setInterval(updateTimer, 1000);
            processResults(jsonObj, 0);
        }
    }
    req.send();
    } catch(e) {
        document.getElementById("wrongURL").hidden = false;
    }
}

function processResults(jsonObj, count) {
    var id = document.getElementById.bind(document);
    var embedScript = id("embedScript");
    var q_array = jsonObj.Questions;
    if (count == q_array.length) {
        //Show game over screen
        clearInterval(timer);
        GameOverScreen();
        return;
    }
    var q = q_array[count];
    var gist = id("gist");
    
    var gistURL = q.QuestionText;
    var gisthtml = '<html><body>' + gistURL + '</body></html>';
    gist.contentDocument.open();
    gist.contentDocument.writeln(gisthtml);
    gist.contentDocument.close();
    
    
    updateScore();
    
    var ans_array = q.Answers;
    
    var correctAnswer = ans_array[4];
    
    id("Answer1").innerHTML = ans_array[0];
    id("Answer2").innerHTML = ans_array[1];
    id("Answer3").innerHTML = ans_array[2];
    id("Answer4").innerHTML = ans_array[3];

    for (i = 1; i < 5; i++) {
        if (i == correctAnswer) {
            id("Answer" + i).onclick = function () {
                score++;
                processResults(jsonObj, count+1);
            };
        } else {
            id("Answer" + i).onclick = function () {
                score--;
                processResults(jsonObj, count+1);
            };
        }
    }
}

  function parseUserChoiceToJson() {
        var question = new Object();
        question.QuestionText = document.getElementById("questionURL").value;
        question.Answers = new Array(5);
        for (i = 1; i < 5; i++) {
            question.Answers[i-1] = document.getElementById("variant" + i).value;
        }    
        question.Answers[4] = document.getElementById("rightVariant").value;
        Questions.push(question);
        document.getElementById("JSON").innerHTML = '{"Questions":' +JSON.stringify(Questions) + '}';
    }


function updateTimer() {
    time++;
    document.getElementById("time").innerHTML = time;
}


function updateScore() {
    document.getElementById("score").innerHTML = score;
}

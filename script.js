var score = 0;
var timer;
var LastMode; //will hold last mode choosen for the retry button, URL if custom
var Questions = []; //used in JSON parsing

var id = document.getElementById.bind(document); // makes lines shorter and more readable

function ChangeMode(mode) {
    hideElement(id("Main"));
    hideElement(id("GameOver"));
    switch(mode) {
        case "Player":
            showElement(id("custom"));
            break;
        case "Creator":
            showElement(id("creator"));
            break;
        case "AccessURL":
            getJsonRequest(id("userURL").value);
            break;
        /* Since there is currently no known way of determining the <difficulty>,
           this part is commented out. When the <difficulty> can be known,
           this should be reactivated and the subsequent temporary workaround
           cases should be removed. */
        /*default:
            showElement(id("Game"));
            LastMode = mode;
            var location = "Questions/" + mode + "<difficulty>" + "ExampleQuestion.json";
            id("URL").innerText = location;
            getJsonRequest(location);
            break;*/
        case "Java":
            LastMode = "Java";
            showElement(id("Game"));
            id("URL").innerText = "Questions/JavaBeginnerExampleQuestion.json";
            getJsonRequest("Questions/JavaBeginnerExampleQuestion.json");
            break;
        case "Python":
            LastMode = 'Python';
            showElement(id("Game"));
            id("URL").innerText = "Questions/PythonNormalExampleQuestion.json";
            getJsonRequest("Questions/PythonListComprehensionQs.json");
            break;
    }
}

function goHome() {
    clearInterval(timer);
    showElement(id("Main"));
    hideElement(id("Game"));
    hideElement(id("custom"));
    hideElement(id("GameOver"));
    hideElement(id("creator"));
}

function GameOverScreen() {
    hideElement(id("Game"));
    id("finalScore").innerHTML = score;
    id("finalTime").innerHTML = id("time").innerHTML;
    showElement(id("GameOver"));
}

function getJsonRequest(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 404) { // or != 200, depending on what you want
                showElement(id("wrongURL"));
            } else {
                showElement(id("Game"));
                hideElement(id("custom"));
                score = 0;
                id("time").innerHTML = 0;
                var updateTimer = function() {
                    id("time").innerHTML = parseInt(id("time").innerHTML) + 1;
                };
                timer = setInterval(updateTimer, 1000);
                processResults(JSON.parse(this.response), 0);
            }
        }
    }
    hideElement(id("wrongURL"));
    req.send();
}

function processResults(jsonObj, count) {
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

    for (i = 1; i <= 4; i++) {
        if (i == correctAnswer) {
            id("Answer" + i).onclick = function () {
                score++;
                processResults(jsonObj, count + 1);
            };
        } else {
            id("Answer" + i).onclick = function () {
                score--;
                processResults(jsonObj, count + 1);
            };
        }
    }
}

function parseUserChoiceToJson() {
    var question = new Object();
    question.QuestionText = id("questionURL").value;
    question.Answers = [];
    for (i = 1; i <= 4; i++) {
        question.Answers.push(id("variant" + i).value);
    }    
    question.Answers.push(id("rightVariant").value);
    Questions.push(question);
    id("JSON").innerHTML = '{"Questions":' + JSON.stringify(Questions) + '}';
}

function updateScore() {
    id("score").innerHTML = score;
}

function showElement(elem) {
    elem.style.display = "block";
}

function hideElement(elem) {
    elem.style.display = "none";
}

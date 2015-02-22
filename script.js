function ChangeURL(URL) {
    if (URL ==  "Java") {
        Document.getElementById("URL").innerText = "Questions/JavaBeginnerExampleQuestion.json";
    }
    if (URL == "Python") {
        Document.getElementById("URL").innerText = "Questions/PythonNormalExampleQuestion.json";
    }
    Document.getElementById("Main").attributes.class = "ModeHidden";
    Document.getElementById("Game").attributes.class = "ModeVisible";
}
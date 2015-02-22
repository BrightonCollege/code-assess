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
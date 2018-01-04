// Numbers to be used in exercise
var numbers = [0, 1, 2, 3, 4, 5, 6];
numbers.sort(function () { return 0.5 - Math.random() });
var correctAnswers = [];
var firstAttempt = true;
var fouten = 0;
var myVar;
var d = new Date(0);

window.addEventListener("load", init, false);

function init() {

    alert("Vul het resultaat van de bewerkingen in en druk op 'Nakijken' wanneer je klaar bent. De timer begint te lopen nadat je op OK gedrukt hebt");

    var btnEval = document.getElementsByTagName("button")[0];
    var btnReset = document.getElementsByTagName("button")[1];

    btnEval.addEventListener("click", evaluate);
    btnReset.addEventListener("click", function () {
        location.reload();
    })

    insertCalculations();
    var input = document.getElementsByTagName("input")[0].setAttribute('autofocus', 'autofocus');
    wrap5();

    d.setHours(0);
    myVar = setInterval(myTimer, 1000);
    function myTimer() {
        d.setTime(d.getTime() + 1000);
        document.getElementById("clock").innerHTML = d.toLocaleTimeString();
    }
}

function insertCalculations() {
    for (let i = 0; i < numbers.length; i++) {
        var x = numbers[i];
        for (let j = 0; j < numbers.length; j++) {
            var y = numbers[j];
            if (x + y >= 0 && x + y <= 6) {
                correctAnswers.push(x + y);
                var div = document.createElement("div");
                var label = document.createElement("label");
                var input = document.createElement("input");
                var t = document.createTextNode(x + " + " + y + " = ");
                label.appendChild(t);
                div.appendChild(label);
                div.appendChild(input);
                document.getElementById("form").appendChild(div);
            }
            if (x - y >= 0 && x - y <= 6) {
                correctAnswers.push(x - y);
                var div = document.createElement("div");
                var label = document.createElement("label");
                var input = document.createElement("input");
                var t = document.createTextNode(x + " - " + y + " = ");
                label.appendChild(t);
                div.appendChild(label);
                div.appendChild(input);
                document.getElementById("form").appendChild(div);
            }
        }
    }
}

function evaluate() {
    clearInterval(myVar);
    $("img").remove();
    var answers = document.getElementsByTagName("input");
    console.log(answers);
    for (let i = 0; i < answers.length; i++) {
        var correct = parseInt(answers[i].value) === (correctAnswers[i]);
        console.log(correct);
        if (correct) {
            answers[i].parentElement.className = "correct";
        } else {
            answers[i].parentElement.className = "";
            if (firstAttempt) fouten++;
        }
    }
    var completed = true;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].parentElement.className !== "correct") {
            completed = false;
            addImgWrong(answers[i]);
        } else {
            addImgCorrect(answers[i]);
        }
    }
    if (completed) {
        document.getElementById("comment").innerText = "Proficiat alles juist!"
            + "\n Tijdsduur eerste poging : " + d.toLocaleTimeString()
            + "\n Aantal fouten bij de eerste poging : " + fouten + " / " + answers.length
            + "\n Score bij de eerste poging : " + Math.round((answers.length - fouten) / answers.length * 10000) / 100 + "%";
    } else {
        document.getElementById("comment").innerText = "Nog niet alles juist. "
            + "\n Tijdsduur eerste poging : " + d.getMinutes() + " minuten en " + d.getSeconds() + " seconden"
            + "\n Aantal fouten bij de eerste poging : " + fouten + " / " + answers.length
            + "\n Score bij de eerste poging : " + Math.round((answers.length - fouten) / answers.length * 10000) / 100 + "%";
    }
    firstAttempt = false;
}

function wrap5() {
    var divs = $("#form > div");
    for (var i = 0; i < divs.length; i += 5) {
        divs.slice(i, i + 5).wrapAll("<div class='group5'></div>");
    }
}

function addImgWrong(answer) {
    var ImgWrong = document.createElement("img");
    ImgWrong.src = "images/wrong.jpg";
    ImgWrong.style.width = "1em";
    answer.parentNode.appendChild(ImgWrong);
}

function addImgCorrect(answer) {
    var ImgCorrect = document.createElement("img");
    ImgCorrect.src = "images/correct.jpg";
    ImgCorrect.style.width = "1em";
    answer.parentNode.appendChild(ImgCorrect);
}
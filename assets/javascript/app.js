var correct = 0;
var incorrect = 0;
var timer = 30;
var intervalId;
var num = 0;        //The trivia question number
var trivia = [{
    question: "Question 1?",
    choices: ["First Answer 1", "Second Answer 1", "Third Answer 1", "Fourth Answer 1"],
    answer: 0
}, {
    question: "Question 2?",
    choices: ["First Answer 1", "Second Answer 1", "Third Answer 1", "Fourth Answer 1"],
    answer: 3
}, {
    question: "Question 3?",
    choices: ["First Answer 1", "Second Answer 1", "Third Answer 1", "Fourth Answer 1"],
    answer: 2
}];

$(document).ready(function () {

    $("#start").on("click", run);

    $(document).on("click", ".answerChoice", function () {

        stop();

        var userInput = $(this).attr("data");     //Grab the user's answer

        if (trivia[num].answer == userInput) {
            $("#answers").html("<h2>Correct!</h2>");
            correct++;
            num++;
            setTimeout(run, 3000);
        } else {
            $("#answers").html("<h2>Incorrect!</h2>");
            incorrect++;
            num++;
            setTimeout(run, 3000);
        }

    });

});

function run() {
    $(this).hide();     //Hide the start button
    intervalID = setInterval(decrement, 1000);
    display();
}

function stop() {
    clearInterval(intervalId);
    timer = 30;
}

function decrement() {

    $("#timer").html("<h2>Time Remaining: " + timer + "</h2>");
    timer--;

    if (timer === 0) {
        stop();
        $("#time-out").html("<h2>Time Up!</h2>")
    }

}

function display() { 

    if (num < trivia.length) {      //Display questions until we've reached the end of all trivia questions

        $("#question").html(trivia[num].question);

        var choicesArr = trivia[num].choices;

        for (var i = 0; i < trivia[num].choices.length; i++) {      //Create buttons for each choice in each question
            var button = $("<button>");
            button.text(choicesArr[i]);
            button.addClass("answerChoice");
            button.attr("data", i);
            $("#answers").append(button);
        }
    } else {

        $("#correct").html("Correct: " + correct);
        $("#incorrect").html("Incorrect: " + incorrect);

    }

}


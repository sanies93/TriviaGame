var correct = 0;
var incorrect = 0;
var timer = 5;
var intervalId;
var num = 0;        //Sort through the trivia questions
var trivia = [{
    question: "What is the smallest state of the U.S.?",
    choices: ["Delaware", "Rhode Island", "Iowa", "Wisconsin"],
    answer: 1,
    image: "assets/images/rhode-island.jpg"
}, {
    question: "What is the longest river in the United States?",
    choices: ["Colorado", "Rio Grande", "Yukon", "Missouri"],
    answer: 3,
    image: "assets/images/missouri.jpg"
}, {
    question: "Name the largest American state by area.",
    choices: ["Alaska", "California", "Texas", "Montana"],
    answer: 0,
    image: "assets/images/alaska.jpg"
}, {
    question: "In which state is Mount Rushmore located?",
    choices: ["North Dakota", "North Carolina", "South Dakota", "South Carolina"],
    answer: 2,
    image: "assets/images/south-dakota.jpg"
}, {
    question: "Name the largest lake in the U.S.",
    choices: ["Lake Superior", "Lake Michigan", "Lake Tahoe", "Lake Huron"],
    answer: 0,
    image: "assets/images/lake-superior.jpg"
}, {
    question: "Name the capital of Florida.",
    choices: ["Honolulu", "Tallahassee", "Little Rock", "Helena"],
    answer: 1,
    image: "assets/images/florida.jpg"
}, {
    question: "In which state is Atlantic City located?",
    choices: ["New Jersey", "New York", "New Hampshire", "Massachusetts"],
    answer: 0,
    image: "assets/images/new-jersey.png"
}, {
    question: "How many states share a border with Mexico?",
    choices: ["2", "3", "4", "5"],
    answer: 2,
    image: "assets/images/mexico.png"
}, {
    question: "Which state only touches one state?",
    choices: ["Alaska", "Connecticut", "Florida", "Maine"],
    answer: 3,
    image: "assets/images/maine.jpg"
}];

var ans;
var image = $("<img>");
    image.attr("src", trivia[num].image);
    image.attr("width", "300");
    image.attr("height", "300");


$(document).ready(function () {

    $("#start").on("click", run);

    $(document).on("click", ".answerChoice", function () {

        stop();

        var userInput = $(this).attr("data");     //Grab the user's answer
        ans = trivia[num].answer;

        if (trivia[num].answer == userInput) {
            $("#question").html("<h2>Correct!</h2>")
            $("#answers").html("<br>");
            $("#answers").append(image);
            correct++;
            next();
        } else {
            $("#question").html("<h2>Incorrect!</h2>");
            $("#answers").html("The correct answer was " + trivia[num].choices[ans] + "<br>");
            $("#answers").append(image);
            incorrect++;
            next();
        }

    });

});

function run() {
    $(this).hide();     //Hide the start button
    intervalId = setInterval(decrement, 1000);
    display();
}

function stop() {
    clearInterval(intervalId);
}

function decrement() {

    $("#timer").html("<h2>Time Remaining: " + timer + "</h2>");
    timer--;

    ans = trivia[num].answer;

    if (timer < 0) {
        stop();
        $("#timer").html("<h2>Time Up!</h2>");
        $("#question").html(" ");
        $("#answers").html("The correct answer was " + trivia[num].choices[ans] + "</br>");
        $("#answers").append(image);
        incorrect++;
        next();
    }

}

function display() {

    if (num < trivia.length) {      //Display questions until we've reached the end of all trivia questions

        $("#question").html(trivia[num].question);
        $("#answers").html(" ");

        var choicesArr = trivia[num].choices;

        for (var i = 0; i < choicesArr.length; i++) {      //Create buttons for each choice in each question
            var button = $("<button>");
            button.text(choicesArr[i]);
            button.addClass("answerChoice");
            button.attr("data", i);
            $("#answers").append(button);
        }
    } else {

        stop();
        $("#question").html("Your results are below!");
        $("#answers").html("Correct: " + correct + "<br>" + "Incorrect: " + incorrect + "<br>");
        var replay = $("<button>");
        replay.text("Play Again");
        replay.attr("id", "replay");
        $("#answers").append(replay);
        $("#replay").on("click", reset);

    }

}

function next() {
    image.attr("src", trivia[num].image);
    num++;
    if (num < trivia.length) {
        ans = trivia[num].answer;
    }
    timer = 5;
    setTimeout(run, 3000);
}

function reset() {
    correct = 0;
    incorrect = 0;
    num = 0;
    timer = 5;
    run();
}


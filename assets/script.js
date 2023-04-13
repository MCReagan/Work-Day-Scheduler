// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// savButton scans the page and returns an object of all save buttons
var saveButton = document.querySelectorAll(".saveBtn");

// function displays time using dayjs. it will display the current time and updates every second
function displayTime() {
    var today = dayjs().format('MMM D, YYYY, h:mm:ss a');
    $('#currentDay').text(today);
}

// function changes the color of the hour depending on if it is past/present/or future
function timeColor() {
    var hour = dayjs().hour();
    var currHour = document.getElementsByClassName("time-block");

    $(".time-block").each(function () {
        for (var i = 0; i < currHour.length; i++) {
            if ((parseInt(currHour[i].id)) > hour) {
                $(currHour[i]).addClass("future");
            } else if ((parseInt(currHour[i].id)) == hour) {
                $(currHour[i]).addClass("present");
            } else {
                $(currHour[i]).addClass("past");
            }
        }
    })
};

// savebutton eventlistener listens to a save button press and sets the value of the time and user input in localstorage
for (i = 0; i < saveButton.length; i++) {
    saveButton[i].addEventListener("click", function () {
        var time = $(this).siblings('.hour').text();
        var plans = $(this).siblings(".description").val();
        localStorage.setItem(time, plans);
    })
};

// renderPlans sets the value of currHour to the text in the corresponding(this) div with class .hour. It also sets the value of currPlan to the locally stored item value of the corresponding(this) div with class of .hour. It then sets the text of the corresponding(this) div with class of .description to the value of currPlan.
function renderPlans() {
    $('.hour').each(function() {
        var currHour = $(this).text();
        var currPlan = localStorage.getItem(currHour);
        if(currPlan !== null) {
            $(this).siblings(".description").text(currPlan);
        }
    })
}

// calls functions and sets a timer to update content in real time
renderPlans();
timeColor();
displayTime();
setInterval(timeColor, 1000);
setInterval(displayTime, 1000);
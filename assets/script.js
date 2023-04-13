// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var saveButton = document.querySelectorAll(".saveBtn");
$(function () {

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?

});


function displayTime() {
    var today = dayjs().format('MMM D, YYYY, h:mm:ss a');
    $('#currentDay').text(today);
}

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

for (i = 0; i < saveButton.length; i++) {
    saveButton[i].addEventListener("click", function () {
        var time = $(this).siblings('.hour').text();
        var plans = $(this).siblings(".description").val();
        localStorage.setItem(time, plans);
    })
};

function renderPlans() {
    $('.hour').each(function() {
        var currHour = $(this).text();
        var currPlan = localStorage.getItem(currHour);
        if(currPlan !== null) {
            $(this).siblings(".description").text(currPlan);
        }
    })
}

renderPlans();
timeColor();
displayTime();
setInterval(timeColor, 1000);
setInterval(displayTime, 1000);
// TODO features
/*
    //top displays current day
    // hour long time blocks from 9-5
    // time blocks are color coded for past/pres/fut
    // when time block clicked can enter event
    when save button clicked content saved in local
    when page refreshed load from local
*/
var timeBlockArray = [];
var dayStart = 9;
var dayEnd = 17;

// shows current day at top of page
var currentDay = function() {
    // gets current date and displays at top of page
    var today = moment().format("dddd, MMMM Do");
    $("#currentDay").text(today);
}

// TODO createTimeBlocks function
/*      function called at bottom to dynamically create blocks
            until load function created
        // use loop
        formatting */
// initializes timeBlocks on load
var createTimeBlocks = function() {
    for (i = 0; i < timeBlockArray.length; i++) {
        // creates elements
        var rowEl = $("<div>").addClass("row align-items-start");
        var hourEl = $("<time>").addClass("hour col-1");
        var timeBlockEl = $("<p>").addClass("time-block col-10 past p-4");
        var saveBtnEl = $("<button>").addClass("saveBtn col-1 p-3");
        var iconEl = $("<i>").addClass("fas fa-save p-1");
        // fills in elements with text
        if (timeBlockArray[i].time < 12) {
            hourEl.text(timeBlockArray[i].time + " AM");
        } else if (timeBlockArray[i].time === 12) {
            hourEl.text(timeBlockArray[i].time + " PM");
        } else {
            hourEl.text((timeBlockArray[i].time - 12) + " PM");
        }
        timeBlockEl.text(timeBlockArray[i].text);
        // appends new elements
        saveBtnEl.append(iconEl);
        rowEl.append(hourEl, timeBlockEl, saveBtnEl);
        $(".container").append(rowEl);
    }
    // sets status of time-blocks
    timeCheck();
}

var timeCheck = function() {
    // for each row
    $(".row").each(function(index, eventEl){
        // get hour from row and add 12 if PM
        var hour = $(eventEl).find("time").text().trim().split(" ");
        hour[0] = parseInt(hour[0]);
        if (hour[1] === "PM") {
            if(hour[0] != 12) {
                hour[0] += 12;
            }
        }
        // get current hour
        var currentHour = parseInt(moment().format("H"));
        // compare hour and current hour to get past/pres/fut and add class to event <p>
        if (hour[0] < currentHour) {
            $(eventEl).find("p").addClass("past");
        } else if (hour[0] === currentHour) {
            $(eventEl).find("p").addClass("present");
        } else if (hour[0] > currentHour) {
            $(eventEl).find("p").addClass("future");
        }
    });
}

// event text was clicked change to editable text area
$(".container").on("click", "p", function() {
    // get current text
    var text = $(this).text().trim();
    // replace p with textarea
    var textInput = $("<textarea>").addClass("form-control col-10 p-4").val(text);
    $(this).replaceWith(textInput);
    // focus text area
    textInput.trigger("focus");
});
// text area unfocused
$(".container").on("blur", "textarea", function() {
    // get current value of text
    var text = $(this).val();
    // recreate p
    var eventP = $("<p>").addClass("time-block col-10 p-4").text(text);
    // replace textarea with p
    $(this).replaceWith(eventP);
    timeCheck();
});


// TODO eventChecker on saveBtn click
/*
    on click saves ONLY that event
    index = hour - 9
*/
$(".container").on("click", "button", function() {
    // gets time and text from sibling elements
    var hour = $(this).siblings(".hour").text().trim().split(" ");
    var eventText = $(this).siblings(".time-block").text().trim();
    hour[0] = parseInt(hour[0]);
    // change time to 24 hr
    if (hour[1] === "PM") {
        if(hour[0] != 12) {
            hour[0] += 12;
        }
    }
    // puts text into array getting index from time then saves array
    timeBlockArray[hour[0] - timeBlockArray.length].text = eventText;
    localStorage.setItem("schedule", JSON.stringify(timeBlockArray));
})

// pulls form local storage and if empty populates empty array
var loadSchedule = function() {
    timeBlockArray = JSON.parse(localStorage.getItem("schedule"));
    // initializes array if no save data
    if (!timeBlockArray) {
        timeBlockArray = [];
        for (var i = dayStart; i <= dayEnd; i++) {
            timeBlockArray.push({
                time: i,
                text: " "
            })
        }
    }
    createTimeBlocks();
}

// functions called on page load
currentDay();
loadSchedule();
// calls timeCheck every 30 mins
setInterval(timeCheck, (1000 * 60) * 60);
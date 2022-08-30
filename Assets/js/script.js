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

// displays current date at top and initializes array
var initial = function() {
    var today = moment().format("dddd, MMMM Do");
    console.log(today);
    $("#currentDay").text(today);
    for (var i = dayStart; i <= dayEnd; i++) {
        timeBlockArray.push({
            time: i;
            text: "";
        })

    }
}

// TODO createTimeBlocks function
/*      function called at bottom to dynamically create blocks
            until load function created
        // use loop
        formatting */
// initializes timeBlocks on load
var createTimeBlocks = function() {
    for (i = dayStart; i <= dayEnd; i++) {
        // creates elements
        var rowEl = $("<div>").addClass("row align-items-start");
        var hourEl = $("<time>").addClass("hour col-1");
        var timeBlockEl = $("<p>").addClass("time-block col-10 past p-4");
        var saveBtnEl = $("<button>").addClass("saveBtn col-1 p-3");
        var iconEl = $("<i>").addClass("fas fa-save border p-1");
        // fills in elements with text
        if (i <= 12) {
            hourEl.text(i + " AM");
        } else {
            hourEl.text((i - 12) + " PM");
        }
        // appends new elements
        saveBtnEl.append(iconEl);
        rowEl.append(hourEl, timeBlockEl, saveBtnEl);
        $(".container").append(rowEl);
    }
}

// TODO timeCheck function
/*
    every setInterval check current time and color code timeBlocks
        based on past/pres/fut
    use classes .past .present .future
    see if you can use an if statement to check how much time is
        left until the end of the hour and if it's less than an
        hour use that else use an hour so it always checks on the
        hour...setInterval would be called at bottom
*/
// checks time status of events
var timeCheck = function() {
    // for each row
    $(".row").each(function(eventEl){
        // get hour from row and add 12 if PM
        var hour = $(eventEl).find("time").text().trim().split(" ");
        hour[0] = parseInt(hour[0]);
        if (hour[1] === "PM") {
            hour[0] += 12;
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

// calls timeCheck every 30 mins
setInterval(function() {
    $(".row").each(function(el) {
        console.log("timeCheck called")
        timeCheck(el);
    });
}, (1000 * 60) * 30);

setInterval(timeCheck(), (1000 * 60) * 60);


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
});


// TODO eventChecker on saveBtn click
/*
    on click saves ONLY that event
    index = hour - 9
*/
$(".saveBtn").on("click", function() {
    timeBlockArray.push({
        time: "",
        text: ""
    })
})

// TODO loadSchedule function
/*
    call at bottom so runs on start up
    if array empty return false
    else call createTimeBlocks
*/

// functions called on page load
createTimeBlocks();
initial();
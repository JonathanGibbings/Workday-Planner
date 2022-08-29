// TODO features
/*
    //top displays current day
    hour long time blocks from 9-5
    time blocks are color coded for past/pres/fut
    when time block clicked can enter event
    when save button clicked content saved in local
    when page refreshed load from local
*/

// TODO timeBlockArray
/*
    create array of objects to hold information
    each object only needs two keys time and text
*/
var timeBlockArray = [];
var dayStart = 9;
var dayEnd = 17;

// displays current date at top
var currentDay = function() {
    var today = moment().format("dddd, MMMM Do");
    console.log(today);
    $("#currentDay").text(today);
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
        var saveBtnEl = $("<button>").addClass("saveBtn col-1");
        var iconEl = $("<i>").addClass("fa-solid fa-floppy-disk border");
        // fills in elements with text
        if (i <= 12) {
            hourEl.text(i + "AM");
        } else {
            hourEl.text((i - 12) + "PM");
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

// TODO eventChecker on timeBlock click
/*
    on click turns timeBlock into text-area
    on blur turn back
*/
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

// TODO loadSchedule function
/*
    call at bottom so runs on start up
    if array empty return false
    else call createTimeBlocks
*/

// functions called on page load
createTimeBlocks();
currentDay();
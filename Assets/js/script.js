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

var currentDay = function() {
    var today = moment().format("dddd, MMMM Do");
    console.log(today);
    $("#currentDay").text(today);
}

// TODO createTimeBlocks function
/*
    function called at bottom to dynamically create blocks
        until load function created
    use loop
*/
var createTimeBlocks = function() {
    for (i = dayStart, i < dayEnd, i++) {
        // create div.row
        // create p.hour with text i"AM" or if i > 12 then (i - 12)"PM"
        // create p.time-block pull text from array with index i - dayStart
        // create button.saveBtn
        // append p's and button to div.row
        // append div.row to div. container
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
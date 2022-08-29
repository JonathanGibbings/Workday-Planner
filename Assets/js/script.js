// TODO features
/*
    top displays current day
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

// TODO currentDay function
/*
    displays current day at top of page
    call at bottom so every time page is loaded it refreshes
    use <p> id=currentDay
*/

// TODO createTimeBlocks function
/*
    function called at bottom to dynamically create blocks
    use loop
*/

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
*/
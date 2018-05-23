

$("#hrSubmit").on("click", function() {

    // Grabs user input
    var clockIn = $("#clockIn").val().trim();
    var clockOut = $("#clockOut").val().trim();
    var date = $("#date").val().trim()
    var noteAdd = $("#noteAdd").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTime = {
  
      clockIn: clockIn,
      clockOut: clockOut,
      date: date,
      noteAdd: noteAdd
    };
  
  $.ajax({
    type: "POST",
    url: "/api/employees/addpunch",
    data: {
        punch_code: 'clockIn',
        punch_time: newTime.clockIn,
        date: newTime.date``
    },
    dataType: "json"
  }).then(function(data){
    console.log(data)
  });

  $.ajax({
    type: 'POST',
    url: '/api/employees/addpunch',
    data:{
        punch_code: 'clockOut',
        punch_time: newTime.clockOut,
        date: newTime.date
    },
    dataType: 'json'
  }).then(function(data){
      console.log(data)
  })

    $.post("/api/employees/addpunch", newTime.clockIn, )

    // Determine when the next train arrives.
    return false;
  });
  
  
  
    var timeArr = tFirstTrain.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;
  
    // If the first train is later than the current time, sent arrival to the first train time
    if (maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    } else {
  
      // Calculate the minutes until arrival using hardcore math
      // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
      // and find the modulus between the difference and the frequency.
      var differenceTimes = moment().diff(trainTime, "minutes");
      var tRemainder = differenceTimes % tFrequency;
      tMinutes = tFrequency - tRemainder;
      // To calculate the arrival time, add the tMinutes to the current time
      tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }
    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
            tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");


moment().format();
$('#error').hide();
updateCollective();
$("#hrSubmit").on("click", function () {

  // Grabs user input
  var clockIn = $("#clockIn").val();
  var clockOut = $("#clockOut").val();
  var date = $('#date').val();
  console.log(moment(date))

  var noteAdd = $("#noteAdd").val();



  // Creates local "temporary" object for holding train data
  var newTime = {

    clockIn: clockIn,
    clockOut: clockOut,
    date: moment(date).utc(date),

    noteAdd: noteAdd
  };
  if(date && clockIn && clockOut){
    $.ajax({
      type: "POST",
      url: "/api/employees/addpunch",
      data: {
        punch_code: 'clockIn',
        time_punch: newTime.clockIn,
        date: newTime.date.hours(clockIn/100).minutes(clockIn%100).format('YYYY-MM-DD HH:mm:ssZ')

      },
      dataType: "json"
    }).then(function (data) {
      if (data.message) {
        $('#error').text(data.message).show();
  
      }else{
        $.ajax({
          type: 'POST',
          url: '/api/employees/addpunch',
          data: {
            punch_code: 'clockOut',
            time_punch: newTime.clockOut,
            date: newTime.date.hour(clockOut/100).minutes(clockOut%100).format('YYYY-MM-DD HH:mm:ssZ')

          },
          dataType: 'json'
        }).then(function (data) {
          if (data.message) {
            $('#error').text(data.message).show();
          }
          updateCollective();
          $("#clockIn").val("");
          $("#clockOut").val("");
          $("#date").val("")
          $("#noteAdd").val("");
        })
      }
    });
  }else{
    $('#error').text('Start Time, End Time and Date are required. Use this only if you missed both clock in and clock out.').show();
  }


});

$("#clearInputBTN").click(function() {
  $("#clockIn").val("");
  $("#clockOut").val("");
  $("#date").val("")
  $("#noteAdd").val("");

});

function updateCollective() {
  $('#hoursTable').empty();
  $.ajax({
    url: '/api/employees/timesheet',
    method: 'GET'

  })
    .then(data => {
      let currentDate = [];
      let sumTotalArr = [];
      let entries = 0;

      data.forEach(t => {
        if (currentDate.indexOf(moment(t.createdAt).format('YYYY-MM-DD')) === -1) {
          currentDate.push(moment(t.createdAt).format('YYYY-MM-DD'));
        }
      })
      currentDate.forEach(date => {
        let dateRow = $(`<tr class="${date}">`)
        dateRow.append($(`<td>`).text(moment(date).utc().format('YYYY MMM DD')))
        dateRow.append($(`<td class="in">`));
        dateRow.append($(`<td class="out">`))
        dateRow.append($(`<td class="total">`))
        let punchIn;
        let punchOut;
        let body = $('#hoursTable')
        body.append(dateRow);
        data.forEach(d => {
          if (date === moment(d.createdAt).format('YYYY-MM-DD')) {
            if (d.punch_code === 'clockIn') {
              punchIn = d.createdAt;
            } else {
              punchOut = d.createdAt;
            }
          }
        })
        $(`.${date} .in`).text(moment(punchIn).utc().format('hh:mm'))

        if (punchOut) {

          $(`.${date} .out`).text(moment(punchOut).utc().format('hh:mm'))
          let x = moment(punchOut).diff(moment(punchIn), 'hours')

          sumTotalArr.push(x);

          let sumTotal = sumTotalArr.reduce((a,c) => {
            return a + c
          },0)

          $(`.${date} .total`).text(x)

          $('#sumTotal').text(sumTotal).prepend("Total Hours Worked for the week: ")

        }

      })
    })

}
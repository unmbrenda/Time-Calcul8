
moment().format();
$('#error').hide();
updateCollective();
$("#hrSubmit").on("click", function () {

  // Grabs user input
  var clockIn = $("#clockIn").val();
  var clockOut = $("#clockOut").val();
  var date = $("#date").val()
  var noteAdd = $("#noteAdd").val();



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
      time_punch: newTime.clockIn,
      date: newTime.date
    },
    dataType: "json"
  }).then(function (data) {
    if (data.message) {
      $('#error').text(data.message).show();

    }
  });

  $.ajax({
    type: 'POST',
    url: '/api/employees/addpunch',
    data: {
      punch_code: 'clockOut',
      time_punch: newTime.clockOut,
      date: newTime.date
    },
    dataType: 'json'
  }).then(function (data) {
    if (data.message) {
      $('#error').text(data.message).show();
    }
  })
  updateCollective();

});

$("#clearInputBTN").click(function() {
  $("#clockIn").html("");

});

function updateCollective() {
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
        dateRow.append($(`<td>`).text(moment(date).format('YYYY MMM DD')))
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
        $(`.${date} .in`).text(moment(punchIn).format('hh:mm'))

        if (punchOut) {

          $(`.${date} .out`).text(moment(punchOut).format('hh:mm'))
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
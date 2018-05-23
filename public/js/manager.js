
$('.employ').hide();

$('#error').hide();

$.ajax({
    url: '/api/employees',
    method: 'get'
}).then(data=>{
    let select = $('#employees')
    data.forEach(e=>{
        select.append($(`<option id="${e.id}">`).text(`${e.first_name} ${e.last_name}`))
    })
})


$('#get-timecards').on('click', function(e){
    e.preventDefault();
    console.log($('#employees option:selected').attr('id'))
    updateCollective($('#employees option:selected').attr('id'))
    $('.employ').show();
})


















function updateCollective(id) {
    $.ajax({
      url: `/api/employees/timesheet/${id}`,
      method: 'GET'
  
    })
      .then(data => {
        let currentDate = [];
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
            $(`.${date} .total`).text(x)
          }
  
        })
      })
  
  }
const punchCard = document.getElementById("punchClock");
const userId = document.getElementById("userId");
const maxUserIdLen = 5;
const punchCardMessage = $("#punchCardMessage");
const clockIn = document.getElementById("clockIn");
const clockOut = document.getElementById("clockOut");

punchCardMessage.hide();


function handleKeyPress(event) {
    if (this.value.length > maxUserIdLen) {
        punchCardMessage.text("Employee Id should be no more than 5 digits.");
    } else {
        punchCardMessage.text("");
    }
}

userId.addEventListener("keydown", handleKeyPress);
userId.addEventListener("keyup", handleKeyPress);

function clockInOut(employeeId, punchCode) {

    const newEntry = {
        employee_id: employeeId,
        punch_code: punchCode
    };

    $.ajax('/api/employees', {
        method: 'post',
        data: {
            UserId: newEntry.employee_id,
            punch_code: newEntry.punch_code
        }
    })
        // .then(response => response.json())
        .then(response => {
            punchCard.reset();
            punchCardMessage.innerHTML = "Action completed.";

            setTimeout(() => {
                punchCardMessage.text("");
            }, 2000);
        })
        .catch(err => {
            punchCardMessage.text("There was a problem completing action. Please input the correct employee number.");
            punchCardMessage.show();
            console.log(err);
        });
}

function handleClick(event) {
    event.preventDefault();
    const punchCode = this.id;

    clockInOut(userId.value, punchCode);

};

clockIn.addEventListener("click", handleClick);
clockOut.addEventListener("click", handleClick);
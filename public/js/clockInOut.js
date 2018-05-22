const punchCard = document.getElementById("punchClock");
const userId = document.getElementById("userId");
const maxUserIdLen = 5;
const punchCardMessage = document.getElementById("punchCardMessage");
const clockIn = document.getElementById("clockIn");
const clockOut = document.getElementById("clockOut");


function handleKeyPress(event){
    if (event.target.value.length > maxUserIdLen){
        punchCardMessage.innerText = "Employee Id should be no more than 5 digits.";
    } else {
        punchCardMessage.innerText = "";        
    }
}

userId.addEventListener("keydown", handleKeyPress);
userId.addEventListener("keyup", handleKeyPress);

function clockInOut(employeeId, punchCode){

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
        punchCardMessage.innerHTML = "Action cmpleted.";

        setTimeout(() => {
            punchCardMessage.innerHTML = "";
        }, 2000);
    })
    .catch(err => {
        punchCardMessage.innerText = "There was a problem completing action.";
        console.log(err);
    });
}

function handleClick(event){
    event.preventDefault();
    const punchCode = this.id;

    clockInOut(userId.value, punchCode);

};

clockIn.addEventListener("click", handleClick);
clockOut.addEventListener("click", handleClick);
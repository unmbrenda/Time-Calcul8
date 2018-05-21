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
        punch_code: punchCode,
        time_punch: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const result = fetch('/api/employees', {
        body: JSON.stringify(newEntry),
        method: 'post',
    })
    .then(response => response.json())
    .then(response => {
        punchCard.reset();
        punchCardMessage.innerHTML("Action cmpleted.");

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
    const punchCode = event.target.id;

    clockInOut(userId.value, punchCode);

};

clockIn.addEventListener("click", handleClick);
clockOut.addEventListener("click", handleClick);
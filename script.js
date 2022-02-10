
var input = document.getElementById("input");
var count = 0; // keep track of chances

let numbur = Math.floor(Math.random() * 90) + 10; // random number
console.log("random number: " + numbur)

while (isaPrime(numbur)) {
    numbur =  Math.floor(Math.random() * 90) + 10;
    console.log("random number: " + numbur)
} 

input.addEventListener("keydown", function (event) {
    // function on enter key press and input not empty
    if ((event.code === "Enter" || event.keyCode == 13) && !isNaN(input.value)) {
        count += 1;
    
        if (numbur == parseInt(input.value)) {
            document.getElementById("div").style.backgroundColor = "green";
            input.style.backgroundColor = "green"
            input.disabled = "true";
        }
        else if (numbur % parseInt(input.value) == 0) {
            // change color of tx box
            document.getElementById(`t${count}`).style.backgroundColor = "green";
                
            // create a p tag and change value to input value
            let used = document.createElement("p");
            used.className = "used";
            used.innerHTML = input.value;
            document.getElementById(`t${count}`).appendChild(used);
            input.value = "";
        }
        else {
            // change color of tx box
            document.getElementById(`t${count}`).style.backgroundColor = "red";
                
            // create a p tag and change value to input value
            let used = document.createElement("p");
            used.className = "used";
            used.innerHTML = input.value;
            document.getElementById(`t${count}`).appendChild(used);
            input.value = "";
        }
    }
});

function isaPrime(number) {
    for (let i = 2; i <= number / 2; i++) {
        if (number % i == 0) {
            return false;
        }
    }

    return true;
}


var input = document.getElementById("input");
var count = 0; // keep track of chance

const numbur = Math.floor(Math.random() * 90) + 10; // random number
console.log("random number: " + numbur)

input.addEventListener("keydown", function (event) {
    // function on enter key press and input not empty
    if (event.code === "Enter" && input.value.trim()) {
        count += 1;

        console.log("input is " + parseInt(input.value))

        if (numbur == parseInt(input.value)) {
            document.getElementById("div").style.backgroundColor = "green";
            input.style.backgroundColor = "green"
            input.disabled = "true";

            console.log("Correct");
        }

        else if (numbur % parseInt(input.value) == 0) {
            // change color of tx box
            document.getElementById(`t${count}`).style.backgroundColor = "green";
            
            // create a p tag and change value to input value
            let used = document.createElement("p");
            used.className = "used";
            used.innerHTML = input.value;
            document.getElementById(`t${count}`).appendChild(used);
            console.log("factor");
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
            console.log("factor");
            input.value = "";
        }
    }
});

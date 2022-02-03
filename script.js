var input = document.getElementById("input");
var count = 0; // keep track of chance

const numbur = Math.floor(Math.random() * 90) + 10; // random number
console.log("random number: " + numbur)

input.addEventListener("keydown", function (event) {
    // function on enter key press and input not empty
    if (event.code === "Enter" && input.value.trim()) {
        count += 1;

        console.log("input is " + parseInt(input.value))

        if (numbur % parseInt(input.value) == 0) {
            // change color of tx box
            document.getElementById(`t${count}`).style.backgroundColor = "green";
            
            let used = document.createElement("p");
            used.className = "used";
            used.innerHTML = input.value;
            document.getElementById(`t${count}`).appendChild(used);
            console.log("factor");
        }
        else {
            console.log("no factor");
        }
    }
});
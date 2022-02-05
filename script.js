
var input = document.getElementById("input");
var count = 0; // keep track of chance

const numbur = Math.floor(Math.random() * 90) + 10; // random number
console.log("random number: " + numbur)


input.addEventListener("keydown", function (event) {
    // function on enter key press and input not empty
    if (event.code === "Enter" && !isNaN(input.value)) {
        count += 1;
    
        if (numbur == parseInt(input.value)) {
            document.getElementById("div").style.backgroundColor = "#2EB086";
            input.style.backgroundColor = "#2EB086"
            input.disabled = "true";
        }
        else if (numbur % parseInt(input.value) == 0) {
            // change color of tx box
            document.getElementById(`t${count}`).style.backgroundColor = "#2EB086";
                
            // create a p tag and change value to input value
            let used = document.createElement("p");
            used.className = "used";
            used.innerHTML = input.value;
            document.getElementById(`t${count}`).appendChild(used);
            input.value = "";
        }
        else {
            // change color of tx box
            document.getElementById(`t${count}`).style.backgroundColor = "#B33030";
                
            // create a p tag and change value to input value
            let used = document.createElement("p");
            used.className = "used";
            used.innerHTML = input.value;
            document.getElementById(`t${count}`).appendChild(used);
            input.value = "";
        }
    }
});

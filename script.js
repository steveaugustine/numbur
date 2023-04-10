setTimeout(function() {
    var input = document.getElementById("input");
    var count = 0; // keep track of chance
    console.log(count)
    
    
    
    function isPrime(numbur) { // returns boolean
        if (numbur <= 1) return false; // negatives
        if (numbur % 2 == 0 && numbur > 2) return false; // even numbers
        const s = Math.sqrt(numbur); // store the square to loop faster
        for(let i = 3; i <= s; i += 2) { // start from 3, stop at the square, increment in twos
            if(numbur % i === 0) return false; // modulo shows a divisor was found
        }
        return true;
      }
    let numbur = Math.floor(Math.random() * 90) + 10; // random number
    console.log("random number: " + numbur);  
    if(isPrime(numbur)===true){
        numbur=numbur+1;
    }
    console.log("New numbur is:"+numbur);
    input.addEventListener("keydown", function (event) {
        // function on enter key press and input not empty
        if (event.code === "Enter" && input.value.trim()) {
            count += 1;
            console.log(count)
            console.log("input is " + parseInt(input.value))
    
            if (numbur == parseInt(input.value)) {
                document.getElementById("div").style.backgroundColor = "#2EB086";
                input.style.backgroundColor = "#2EB086"
                input.disabled = "true";
    
                console.log("Correct");
            }
    
            else if (numbur % parseInt(input.value) == 0) {
                // change color of tx box
                document.getElementById(`t${count}`).style.backgroundColor = "#2EB086";
                
                // create a p tag and change value to input value
                let used = document.createElement("p");
                used.className = "used";
                used.innerHTML = input.value;
                document.getElementById(`t${count}`).appendChild(used);
                console.log("factor");
                input.value = "";
            }
            else if(count==9){
            document.getElementbyId("input").innerHTML=count.toString();
            
            }
            else {
                // change color of tx box
                document.getElementById(`t${count}`).style.backgroundColor = "#B33030";
                
                // create a p tag and change value to input value
                let used = document.createElement("p");
                used.className = "used";
                used.innerHTML = input.value;
                document.getElementById(`t${count}`).appendChild(used);
                console.log("factor");
                input.value = "";
            }
            if(count==8){
                console.log(count + "gdfgdfg")
                input.value = numbur.toString();
                document.getElementById("div").style.backgroundColor = "#FFCE45";
                input.style.backgroundColor = "#FFCE45"
                
                
                }
           
           
        }
        else if(event.keyCode==13){
            alert('enter');
            count += 1;
    
            console.log("input is " + parseInt(input.value))
    
            if (numbur == parseInt(input.value)) {
                document.getElementById("div").style.backgroundColor = "#2EB086";
                input.style.backgroundColor = "#2EB086"
                input.disabled = "true";
    
                console.log("Correct");
            }
    
            else if (numbur % parseInt(input.value) == 0) {
                // change color of tx box
                document.getElementById(`t${count}`).style.backgroundColor = "#2EB086";
                
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
                document.getElementById(`t${count}`).style.backgroundColor = "#B33030";
                
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
}, 2000);

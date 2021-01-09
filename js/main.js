const mainGrid = document.querySelector(".container");
const btnReset = document.querySelector("#reset");
const btnsColor = document.querySelectorAll(".colorbtn");

let noOfCells = 16;
let cellColor = "black";

function creategrid() {
    mainGrid.style.display = 'grid';
    mainGrid.style.gridTemplateRows = `repeat(${noOfCells}, 1fr)`;
    mainGrid.style.gridTemplateColumns = `repeat(${noOfCells}, 1fr)`;

}

function createdivs() {
    let noOfDivs = noOfCells * noOfCells;
    // Instantiate array
    let divArray = [];
    // Iterate through for loop creating 16 divs
    for (i = 0; i < noOfDivs; i++) {
        // For each div created, loop through and create 16 nested divs
        divArray[i] = document.createElement("div");
        divArray[i].classList.add("cell");
        // Add the new element with the text content to the DOM
        mainGrid.appendChild(divArray[i]);
    }

    document.querySelectorAll('.cell').forEach(item => {
        item.addEventListener('mouseover', colorgrid)
    });

    document.querySelectorAll('.cell').forEach(item => {
        item.addEventListener('touchstart', colorgrid)
    });

}

function changeColor() {
    btnsColor.forEach(item => item.classList.remove('selected'));
    switch (this.dataset.color) { 
        case 'rainbow':
            cellColor = 'rainbow';
            this.classList.add('selected');
            break;
        case 'gray':
            cellColor = 'gray';
            this.classList.add('selected');
            break;  
        case 'eraser':
            cellColor = 'eraser';
            this.classList.add('selected');
            break;
        default:
            cellColor = 'black';
            this.classList.add('selected');
            break;
    } 
}

function colorgrid() {
    switch(cellColor){
      case "black":
        this.style.backgroundColor = '#000000';
        this.classList.remove('gray');
        break;
    case "rainbow":
        this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.classList.remove('gray');
        break;
    case 'gray':
        if (this.style.backgroundColor.match(/rgba/)) {
            let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
            if (currentOpacity <= 0.9) {
                this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                this.classList.add('gray');
            }
        } else if (this.classList == 'gray' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
            return;
        } else {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
        }
        break;
    case "eraser":
        this.style.backgroundColor = '#ffffff';
        this.classList.remove('gray');
        break;  
    }
    
}

function checkinput(input) {
    let numberCells = parseInt(input, 10);
    if (isNaN(numberCells)) {
        window.alert("You must enter a positive integer. (Maximum: 100)");
        return true;
    }
    else if (numberCells <= 0) {
        window.alert("You must enter a positive integer. (Maximum: 100)");
        return true;
    }
    else if (numberCells > 100) {
        window.alert("You must enter a positive integer. (Maximum: 100)");
        return true;
    }else{
        noOfCells = numberCells;
        return false;
    }
}


function resetgrid() {
    let promptNumberCells = prompt("How many squares per side? (Maximum: 100)");

    if(checkinput(promptNumberCells)) return;

    while(mainGrid.firstChild) {
        mainGrid.removeChild(mainGrid.firstChild);
    }

   creategrid();
   createdivs();
}

creategrid();
createdivs();

btnReset.addEventListener('click', resetgrid);
btnsColor.forEach(colorButton => colorButton.addEventListener('click', changeColor)); 

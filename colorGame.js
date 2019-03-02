var squares = document.getElementsByClassName("squares");
var rgbDisplay = document.getElementById("rgbDisplay");
var messageDisplay = document.getElementById("messageDisplay");
var resetBttn = document.getElementById("resetBttn");
var modeBttn = document.getElementsByClassName("modeBttn");
var header = document.querySelector("#header");

var numSquares = 6;
var randomColors = [];
var pickedColor;

init();

function init() {
	setUpModeButtons();
	setUpSquares();
	reset();
}


function setUpModeButtons() {
	for (var i = 0; i < modeBttn.length; i++) {
		modeBttn[i].addEventListener("click", function() {
			modeBttn[0].classList.remove("selected");
			modeBttn[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
			reset();
		});
	}

}

function setUpSquares() {
	for (var i = 0; i < numSquares; i++) {
		squares[i].addEventListener("click", function() {
			clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetBttn.textContent = "Play Again?"
				fillColor(pickedColor);
			} else {
				messageDisplay.textContent = "Try Again";
				this.style.backgroundColor = "#232323";
			}
		})
	}
}

function reset() {
	messageDisplay.textContent = "";
	resetBttn.textContent = "New Colors";
	randomColors = generateColorArr();
	pickedColor = pickColor();
	rgbDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
		if (randomColors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = randomColors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	header.style.backgroundColor = "steelblue";
}

resetBttn.addEventListener("click", reset);

function fillColor(color) {
	for (var i = 0; i < numSquares; i++) {
		squares[i].style.backgroundColor = color;
	}
	header.style.backgroundColor = color;
}

function pickColor() {
	var randomIndex = getRandomIntInclusive(0, numSquares-1);
	return randomColors[randomIndex];
}

function generateColorArr() {
	var colorArr = [];
	for (var i = 0; i < numSquares; i++) {
		colorArr.push(generateRandomColor());
	}
	return colorArr;
}

function generateRandomColor() {
	red = getRandomIntInclusive(0, 255);
	green = getRandomIntInclusive(0, 255);
	blue = getRandomIntInclusive(0, 255);
	return "rgb(" + red + ", " + green + ", " + blue + ")"
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}
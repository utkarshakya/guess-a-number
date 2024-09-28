// DOM VARIABLES
let input_number = document.querySelector('#input-number')
let input_message = document.querySelector('#input-message')
let checkButton = document.querySelector('#check')
let remaining_guesses = document.querySelector('#remaining-guess')
let previous_guesses = document.querySelector('#previous-guess')
let guessed_m1 = document.querySelector('#guessedM1')
let guessed_m2 = document.querySelector('#guessedM2')
let startNewGame = document.querySelector('#restart')

// PROGRAM VARIABLES
let previousGuesses = [];
let remainingGuesses = 7;
let randomNumber = Math.floor(Math.random() * 100 + 1);
console.log(randomNumber);


checkButton.addEventListener('click', (e) => {
    e.preventDefault();
    validateValue(input_number.value);
})

// This function checks the input is valid or not.
function validateValue(value) {
    if (value == '') {
        displayMessage(input_message, "Input Field Cannot Be Empty");
    }
    else if (isNaN(value) || value < 1 || value > 100) {
        displayMessage(input_message, "Invalid Value! Please Try Again...");
    }
    else {
        displayMessage(input_message, "");
        checkNumber(parseInt(value)) // Since, value comes in string, we converted it to integer.
    }
}

// This function check the number matches the random number or not.
function checkNumber(number) {
    if (number === randomNumber) {
        displayMessage(guessed_m1, `Congratulation 🎉 You Win 😉`);
        displayMessage(guessed_m2, `The Number Is ${randomNumber}`);
        setNewGame();
    }
    else if (number > randomNumber) {
        displayMessage(guessed_m1, `The Number Is Low 🪫`);
    }
    else {
        displayMessage(guessed_m1, `The Number Is High ⚡`);
    }
    input_number.value = ''
    remainingGuesses--;
    remaining_guesses.innerHTML = `Remaining Guesses = ${remainingGuesses}`;
    previousGuesses.push(number);
    previous_guesses.innerHTML = `Previous Guesses<br>[ ${previousGuesses} ]`;

    if (remainingGuesses == 0) {
        displayMessage(guessed_m1, `Sorry 🙇 You Lose 😟`);
        displayMessage(guessed_m2, `The Number Is ${randomNumber}`);
        setNewGame()
    }
}

function displayMessage(element, message) {
    element.innerHTML = `${message}`
}

function setNewGame() {
    input_number.disabled = true; // This will disable the input field.
    checkButton.disabled = true;
    startNewGame.style.display = 'block'
    startNewGame.addEventListener('click', (e) => {
        e.preventDefault()
        restartGame()
        startNewGame.style.display = 'none'
        e.defaultPrevented = false;
    })
}

    function restartGame() {
        input_number.disabled = false;
        checkButton.disabled = false;
        remainingGuesses = 10;
        remaining_guesses.innerHTML = `Remaining Guesses = ${remainingGuesses}`;
        previousGuesses = [];
        previous_guesses.innerHTML = `Previous Guesses = [ ${previousGuesses} ]`;
        displayMessage(guessed_m1, ``);
        displayMessage(guessed_m2, ``);
        randomNumber = Math.floor(Math.random() * 100 + 1);
    }
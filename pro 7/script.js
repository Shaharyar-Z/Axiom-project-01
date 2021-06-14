// Get DOM Elements
const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letters');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification-container');

// Get DOM Elements for Hangman
const figureParts = document.querySelectorAll('.figure-part');


// Pool of words for selecting Random words

const words = ["needed", "game", "fox", "private", "cool", "front", "ants", "iron", "upward", "office", "per", "neighborhood", "grown", "give", "lungs", "service", "chair", "driving", "value", "indicate", "fat", "electricity", "them", "upward", "die", "brain", "yesterday", "underline", "applied", "blew", "someone", "regular", "phrase", "drove", "tide", "ourselves", "average", "call", "clothing", "met", "typical", "neck"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
// console.log(Math.floor(Math.random() * words.length));

// Tracking array and correct & incorrect guesses
const correctLettersArray = [];
const incorrectLettersArray = [];

// Functions
// Function to display the selected word
function displayWord() {
    word.innerHTML = `${selectedWord
        .split('')
        .map(letter => `
        <span class="letter">
        ${correctLettersArray.includes(letter) ? letter : ''}
        </span>`)
        .join('')
        }`;
    // Replace new line character and form inner word
    const innerWord = word.innerText.replace(/\n/g,'')

    // Compare inner word to selected word 
    if(innerWord === selectedWord) {
        finalMessage.innerText = 'congratulations you won';
        popup.style.display = 'flex'
    }
};

// Function to show the notification
function showNotification() {
    // Add class show to the notification conatiner
    notification.classList.add('show');
    // After 2s hide the notofocation
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
};

// Function to update incorrect letter
function updateIncorrectLetters() {
    // Display the incorrect letters
    incorrectLetters.innerHTML = `
    ${incorrectLettersArray.length > 0 ? '<p>Incorrect Letter</p>' : ''}
    ${incorrectLettersArray.map(letter => `<span>${letter}</span>`)}
    `;

    // Display the Hangman pats
    figureParts.forEach((part, ind) => {
        if (incorrectLettersArray.length > ind) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })
    // Check if user lost
    if (incorrectLettersArray.length === figureParts.length) {
        finalMessage.innerText = 'You Lost!';
        popup.style.display = 'flex'
    }
};

// Event Handlers
// 1- listen for keybaord key press
window.addEventListener('keydown', e => {
    // Check the pressed key 
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        // check if letter is in the selected word
        if (selectedWord.includes(letter)) {
            // check if letter is already in correctLetterArray
            if (!correctLettersArray.includes(letter)) {
                // Add letter into the correctLettersArray 
                correctLettersArray.push(letter);
                // Run the displayWord functiom to display new letter
                displayWord();
            }else {
                showNotification();
            }
        } else {
            // check if letter is already in incorrectLetterArray
            if (!incorrectLettersArray.includes(letter)) {
                // Add letter into the incorrectLettersArray 
                incorrectLettersArray.push(letter);
                // Update the incorrectLettersArray letter UI
                updateIncorrectLetters()
            } else {
                showNotification();
            }
        }
    }
})

// 2- listen for click on play again button
playBtn.addEventListener('click', () => {
    // Empty correctLettersArray & incorrectLettersArray 
    correctLettersArray.splice(0);
    incorrectLettersArray.splice(0);

    // Slelect the new random word
    selectedWord = words[Math.floor(Math.random() * words.length)];
    //  Clear incorrect letter display
    updateIncorrectLetters();
    // Hide popup
    popup.style.display = 'none';
    // Refresh Display
    displayWord();
})

// Execute displayWord on page load
displayWord();
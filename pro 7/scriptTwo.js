// // Get DOM Elements
// const word = document.getElementById('word');
// const incorrectLetters = document.getElementById('incorrect-letters');
// const popup = document.getElementById('popup-container');
// const finalMessage = document.getElementById('final-message');
// const playBtn = document.getElementById('play-btn');
// const notification = document.getElementById('notification-container');


// // Get DOM Elements for Hangman
// const figureParts = document.querySelectorAll('.figure-part');


// // Pool of words for selecting Random words

// const words = ["needed", "game", "fox", "private", "cool", "front", "ants", "iron", "upward", "office", "per", "neighborhood", "grown", "give", "lungs", "service", "chair", "driving", "value", "indicate", "fat", "electricity", "them", "upward", "die", "brain", "yesterday", "underline", "applied", "blew", "someone", "regular", "phrase", "drove", "tide", "ourselves", "average", "call", "clothing", "met", "typical", "neck"];
// const selectedWord = words[Math.floor(Math.random() * words.length)];


// // Tracking array and correct & incorrect guesses
// const correctLettersArray = [];
// const incorrectLettersArray = [];

// // Functions
// // Function to display the selected word
// function displayWord() {
//     word.innerHTML = `${selectedWord
//         .split('')
//         .map(letter => `
//         <span class='letter'>${correctLettersArray.includes(letter) ? letter : ''}</span>
//         `).join('')
//         }`;
//     const innerWord = word.innerText.replace(/\n/g,'');
//     console.log(word.innerText);
//     if (innerWord === selectedWord) {
//         finalMessage.innerText = 'Congratulation You Won!!!';
//         popup.style.display = 'flex';
//     }
// };

// function updateIncorrectLetters() {
//     incorrectLetters.innerHTML = `
//     ${incorrectLettersArray.length > 0 ? '<p>Incorrect Letter</p>' : ''}
//     ${incorrectLettersArray.map(letter => `<span>${letter}</span>`)}
//     `

//     figureParts.forEach((part, ind) => {
//         if (incorrectLettersArray.length > ind) {
//             part.style.display = 'block'
//         } else {
//             part.style.display = ''
//         }
//     })

//     if (incorrectLettersArray.length === figureParts.length) {
//         finalMessage.innerText = 'You Lost !!!'
//         popup.style.display = 'flex';
//     }
// };
// function showNotification() {
//     notification.classList.add('show');

//     setTimeout(() => {
//         notification.classList.remove('show');
//     }, 2000);
// }


// // Event Listner
// window.addEventListener('keydown', e => {
//     if (e.keyCode >= 65 && e.keyCode <= 90) {
//         const letter = e.key;
//         if (selectedWord.includes(letter)) {
//             if (!correctLettersArray.includes(letter)) {
//                 correctLettersArray.push(letter);

//                 displayWord();
//             } else {
//                 showNotification()
//             }
//         } else {
//             if (!incorrectLettersArray.includes(letter)) {
//                 incorrectLettersArray.push(letter);
//                 updateIncorrectLetters();
//             } else {
//                 showNotification();
//             }
//         }
//     }
// });

// playBtn.addEventListener('click', () => {
//     correctLettersArray.splice(0);
//     incorrectLettersArray.splice(0);
//     selectedWord = words[Math.floor(Math.random() * words.length)]
//     updateIncorrectLetters();
//     popup.style.display = 'none';
//     displayWord();
// })

// displayWord();

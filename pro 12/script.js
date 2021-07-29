// Get DOM Elements
const word = document.querySelector('#word');
const userWord = document.querySelector('#user-word');
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');
const settingsBtn = document.querySelector('#setting-btn');
const settingsContainer = document.querySelector('#settings');
const settingsForm = document.querySelector('#form');
const difficultyDropdown = document.querySelector('#difficulty');
const gameover = document.querySelector('#gameover');


// const words = [];

const getApiData =async () => {
    const response =await fetch('https://random-words-api.vercel.app/word');
    const data = await response.json();
    const getWord = data[0].word;
    // console.log(getWord);
    return getWord;
}
// const pushData =async () => {
//     for (let i = 1; i <= 10; i++){
//         let W = getApiData().then((word)=> {return word});
//         words.push(await W);
//         // console.log(words);
//     }
// }
// pushData();

// const words = ['Acquiesce', 'Acronym', 'Ambiguity', 'Analogy', 'Anachronism', 'Andragogy', 'Antithesis', 'Antonym', 'Articulate', 'Assonance', 'Benchmarking', 'Brainstorming', 'Circumspect', 'Clandestine', 'Cognition', 'Collaborate', 'Colloquial', 'Connotation', 'Contrived', 'Conundrum', 'Correlation', 'Criterion', 'Cumulative', 'Curriculum', 'Deference', 'Developmental', 'Dialect', 'Diction', 'Didactic', 'Dissertation', 'Divergent', 'Egregious', 'Eloquence', 'Emergent', 'Empathy', 'Enigma', 'Epitome', 'Epiphany', 'Epitaph', 'Erudite', 'Existential', 'Exponential', 'Formative', 'Holistic', 'Homonym', 'Hubris', 'Hyperbole', 'Incongruous', 'Infamy', 'Initiation', 'Innate', 'Intellectual', 'Interactive', 'Irony', 'Jargon', 'Juxtaposition', 'Malapropism', 'Magnanimous', 'Mentor', 'Metaphor', 'Meticulous', 'Mnemonic', 'Monologue', 'Motif', 'Myriad', 'Nemesis', 'Nominal', 'Norms', 'Obfuscate', 'Obtuse', 'Onomatopoeia', 'Ostentatious', 'Oxymoron', 'Paradox', 'Paraphrase', 'Pedantic', 'Pedagogy', 'Perusal', 'Phonemes', 'Phonological', 'Plagiarism', 'Plethora', 'Posthumously', 'Preposition', 'Pretentious', 'Pseudonym', 'References', 'Reflection', 'Rubric', 'Sardonic', 'Satire', 'Simile', 'Soliloquy', 'Superfluous', 'Syntax', 'Thesis', 'Validity', 'Vernacular', 'Virtual', 'Vocational'];

let randomWord;

let score = 0;

let time = 10;

let difficulty = localStorage.getItem('Difficulty') !== null ? localStorage.getItem('Difficulty') : 'easy';

// Render value for the difficulty
difficultyDropdown.value = localStorage.getItem('Difficulty') !== null ? localStorage.getItem('Difficulty') : 'easy';

// when page load automatically focus on the user field
userWord.focus();

// const generateWord = () => {
//     const generatedWord = words[Math.floor(Math.random() * 100)];
//     return generatedWord;
// };

// function to render the word
const renderWord =async () => {
    randomWord = await getApiData();

    word.innerHTML = randomWord;
};

// function to increment score value
const incrementScore = () => {
    score++;
    scoreElement.innerHTML = score;
};

// start timer countdown
const timeInterval = setInterval(() => {
    time--;
    timeElement.innerHTML = `${time}s`;
    // check if time reaches 0
    if (time === 0) {
        // stop timer
        clearInterval(timeInterval)
        gameOver();
    }
}, 1000);

// funtion to handle gameover
const gameOver = () => {
    gameover.style.display = 'flex';
    // content to display in the gomover container
    gameover.innerHTML = `
    <h1>Time Up!</h1>
    <p>Good game! Your score is ${score}</p>
    <button class='play-again' onclick='location.reload()'>Play Again</button>
    `
};



// Event Listner
userWord.addEventListener('input', e => {
    const userInput = e.target.value;
    if (userInput === randomWord.toLowerCase()) {
        renderWord();
        // Increment score by 1
        incrementScore();
        userWord.value = ''
        // add more time to the timer
        if (difficulty === 'easy') {
            // if difficulty is easy add 3s into the timer
            time += 3;
        } else if (difficulty === 'medium') {
            // if difficulty is medium add 3s into the timer
            time += 2;
        } else {
            // if difficulty is hard add 3s into the timer
            time += 1;
        }
        // render new time in the DOM
        timeElement.innerHTML = time;
    }
});

// Listen for click on the settings button
settingsBtn.addEventListener('click', () => settingsContainer.classList.toggle('hide'));
// Listen foe a change in difficulty
difficultyDropdown.addEventListener('change', e => {
    // Newly selected value of difficulty
    difficulty = e.target.value;
    // Use local storage to set difficulty  
    localStorage.setItem('Difficulty',difficulty)
})

// render the word on page load
renderWord();

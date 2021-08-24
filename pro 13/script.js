// GET DOM
const addCardBtn = document.querySelector('#add-card');
const clearCardBtn = document.querySelector('#clear-cards');
const cardsContainer = document.querySelector('#cards-container');
const prevBtn = document.querySelector('#prev-btn');
const currentCardNav = document.querySelector('#current-card');
const nextBtn = document.querySelector('#next-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const questionInput = document.querySelector('#question');
const answerInput = document.querySelector('#answer');
const addCardSubmitBtn = document.querySelector('#add-card-btn');
const addCardContainer = document.querySelector('#add-card-container');


// id of current card
let currentCardId = 0;

// colooection of cards DOM ellemnts
const cards = [];

// collection of cards data

const cardData = getCardData();
// const cardData = [
//     {
//         question: 'What is React',
//         answer: 'Declarative. React makes it painless to create interactive UIs.'
//     },
//     {
//         question: 'What is Html',
//         answer: 'The HyperText Markup Language, or HTML is the standard markup language for documents designed to be displayed in a web browser.'
//     },
//     {
//         question: 'What is Mongodb',
//         answer: 'MongoDB is an open source NoSQL database management program. NoSQL is used as an alternative to traditional relational databases. NoSQL databases are quite ...'
//     },
// ];

// function to save on localStorage
function saveCardData(cardData) {
    localStorage.setItem('cards', JSON.stringify(cardData));
    window.location.reload();
};
// function to get data on localStorage
function getCardData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
};

// function to update the update Current Card Nav
function updateCurrentCardNav(){
    currentCardNav.innerText = `${currentCardId + 1} / ${cards.length}`;
};

// function for generating cards
function generateCards() {
    cardData.forEach((data, index) => generateCard(data, index));
};

// function to generate a single card
function generateCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
        <div class='inside-card'>
        <div class='card-front'>
        <p>${data.question}</p>
        </div>
        <div class='card-back'>
        <p>${data.answer}</p>
        </div>
        </div>
    `;

    // event listner
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    cards.push(card)
    cardsContainer.appendChild(card);
    updateCurrentCardNav();
};

// Event Listners
// next btn
nextBtn.addEventListener('click', () => {
    cards[currentCardId].className = 'card left';
    currentCardId++;
    if (currentCardId > cards.length - 1) {
        currentCardId = 0;
    }
    console.log(currentCardId);
    cards[currentCardId].className = 'card active';
    updateCurrentCardNav();
});
// Prev btn
prevBtn.addEventListener('click', () => {
    cards[currentCardId].className = 'card right';
    currentCardId--;
    if (currentCardId < 0) {
        currentCardId = cards.length - 1;
    }
    console.log(currentCardId);
    cards[currentCardId].className = 'card active';
    updateCurrentCardNav();
});
// add card form
addCardBtn.addEventListener('click', () => addCardContainer.classList.add('active'));
// cancel btn
cancelBtn.addEventListener('click', () => addCardContainer.classList.remove('active'));
// add card om submit
addCardSubmitBtn.addEventListener('click', () => {
    // Get the values of question and answer from the form
    const question = questionInput.value;
    const answer = answerInput.value;
    // Check if values are valid
    if ( question.trim() && answer.trim() ) {
        // Create an object with q & a
        const nextCard = { question, answer };
        // Generate a new card using nextCard object
        generateCard(nextCard);
        // Clear form fields
        questionInput.value = '';
        answerInput.value = '';
        // Hide the add card form
        addCardContainer.classList.remove('active');
        // Save nextCard object into cardData array
        cardData.push(nextCard);
        // Save to localStorage
        saveCardData(cardData);
    }
})

// clear card 
clearCardBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
})

generateCards();
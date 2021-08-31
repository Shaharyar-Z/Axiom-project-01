
// Get DOM Elements
const main = document.querySelector('#main');
const selectVoices = document.querySelector('#voices');
const toggleBtn = document.querySelector('#toggle');
const closeBtn = document.querySelector('#close');
const customText = document.querySelector('#text');
const readBtn = document.querySelector('#read');
const customTextDiv = document.querySelector('#custom-text');

const data = [
    {
        image: './images/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './images/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './images/food.jpg',
        text: "I' Hungry"
    },
    {
        image: './images/grandma.jpg',
        text: "I want to go Grandma's"
    },
    {
        image: './images/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './images/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './images/home.jpg',
        text: "I want to go Home"
    },
    {
        image: './images/outside.jpg',
        text: "I want to go Outside"
    },
    {
        image: './images/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './images/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './images/school.jpg',
        text: "I want to go School"
    },
    {
        image: './images/tired.jpg',
        text: "I'm Tired"
    },
];

data.map(createBox);

// func 1
function createBox(Obj) {
    console.log(Obj);
    const box = document.createElement('div');
    const { image, text } = Obj;
    box.classList.add('box');
    box.innerHTML = `
    <img src='${image}' alt='${text}'/>
    <p class='imageInfo'>${text}</p>
    `;
    // 
    box.addEventListener('click', () => {
        setMessage(text);
        speakText();
    })
    // 
    main.appendChild(box);
};
// Initialize speech synthasis
const message = new SpeechSynthesisUtterance();

// func 2
function populateVoiceList() {
    if(typeof speechSynthesis === 'undefined') {
      return;
    }
  
    var voices = speechSynthesis.getVoices();
  
    for(var i = 0; i < voices.length; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
  
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      selectVoices.appendChild(option);
    }
  }
  
  populateVoiceList();
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

// 3-
function setMessage(text) {
    message.text = text
};

// 4-
function speakText() {
    speechSynthesis.speak(message);
};
// 5-
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
};

// Event Listner]
// 1-
toggleBtn.addEventListener('click', () => {
    customTextDiv.classList.toggle('show');
});

// 2-
closeBtn.addEventListener('click', () => {
    customTextDiv.classList.remove('show');
});
// 3-
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);
// 4-
selectVoices.addEventListener('change', setVoice);
// 5-
readBtn.addEventListener('click', () => {
    setMessage(customText.value);
    speakText();
});
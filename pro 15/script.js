// Get DOM element
const form = document.querySelector('#form');
const search = document.querySelector('#search');
const results = document.querySelector('#results');
const pagination = document.querySelector('#pagination');


const api = `https://api.lyrics.ovh`;


// Functions
// 1-
async function searchTerm(term) {
    const res = await fetch(`${api}/suggest/${term}`);
    const data = await res.json();
    showData(data);
};

// 2-
function showData(data) {
    results.innerHTML = `
    <ul class='songs'>
        ${data.data.map(song => `
        <li>
            <span>${song.name} - ${song.title}</span>
            <button class='btn' data-artist='${song.artist.name} data-title='${song.title}'='>Get Lyrics</button>
        </li>
        `).join('')
    }
    </ul>
    `;
    // add pagination
    if (data.prev || data.next) {
        pagination.innerHTML = `
        ${data.prev ? `<button class='btn' onClick="getMoreSongs('${data.prev}')">Prev</button>`:''}
        ${data.next ? `<button class='btn' onClick="getMoreSongs('${data.next}')>Next</button>`:''}
        `;
    } else{
        pagination.innerHTML = '';
    }
};

// 3-
async function getMoreSongs(url) {
    const res = await fetch(
        // `https://cors-anywhere.herokuapp.com/${url}`
    );
    const data = await res.json();
    // showData(data)
}
// 4-
function getLyrics(artist,title) {
    const res = await fetch(
        // `${api}/v1/${artist}/${title}`
    );
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'</br>');

    results.innerHTML = `
    <h2>${artist} - ${title}</h2>
    <p>${lyrics}</p>
    `
    pagination.innerHTML = '';
};

// Event Listner
// 1-
form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    if (searchTerm) {
        searchSongs(searchTerm);
    } else {
        alert('Please enter a valid Search')
    }
});

// 2-
results.addEventListener('click', e => {
    const clickedElement = e.target.tagName;
    if (clickedElement === 'BUTTON') {
        const artist = clickedElement.getAttribute('data-artist');
        const title = clickedElement.getAttribute('data-title');
        getLyrics(artist, title);
    }
})
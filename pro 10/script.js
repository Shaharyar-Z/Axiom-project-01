// Get DOM Elements
const music = document.querySelector('audio');
const img = document.querySelector('img')
const play = document.getElementById('play');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const progress = document.getElementById('progress');

const songs = [
    {
        name: 'shery-1',
        title: 'Janam Fida',
        artist: 'loyalist'
    },
    {
        name: 'shery-2',
        title: 'Ankh uthi',
        artist: 'Nusrat'
    },
    {
        name: 'shery-3',
        title: 'walking firiri',
        artist: 'Shery'
    },
]

function audioStatus(){
    if (music.paused) {
        music.play()
        play.classList.replace('fa-play', 'fa-pause')
        img.classList.add('anime')
    } else {
        music.pause()
        play.classList.replace('fa-pause', 'fa-play')
        img.classList.remove('anime')
    }
};

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    music.src = `music/${song.name}.mp3`;
    img.src = `images/${song.name}.jpg`;
};


songIndex = 0;

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex])
    audioStatus()
};
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex])
    audioStatus()
};

function setAudioProgress() {
    progress.innerHTML = ''
    const progressBar = document.createElement('div')
    progressBar.classList.add('progress-bar')
    progressBar.innerHTML = ''

    // let progressClass = progressBar.getElementsByClassName('.progress-bar')

    progressBar.style.width = `${(music.currentTime / music.duration) * 100}%`
    progress.appendChild(progressBar)

    if (progressBar.style.width === `100%` ) {
        audioStatus()
        nextSong()
    }
}


play.addEventListener('click', audioStatus)
next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)
music.addEventListener('timeupdate',setAudioProgress)
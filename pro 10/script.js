// Get DOM Elements
const music = document.querySelector('audio');
const img = document.querySelector('img')
const play = document.getElementById('play');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const progress = document.getElementById('progress');
const volume = document.querySelector('#volume');
const volumeBtn = document.querySelector('#volume-up');

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
    // songIndex = (songIndex + 1) % songs.length;
    songIndex++;
    // Check if selected track index is greater than the index of last track
    if ( songIndex > songs.length - 1 ) {
        // Reassign the songIndex to last track in the trackArray
        songIndex = 0;
    };
    loadSong(songs[songIndex])
    audioStatus()
};
function prevSong() {
    // songIndex = (songIndex - 1 + songs.length) % songs.length;
    songIndex--;
    if ( songIndex < 0 ) {
        // Reassign the trackIndex to last track in the trackArray
        songIndex = songs.length - 1;
    };
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
function setProgress(e) {
    const width = this.clientWidth;
    const clickedLocation = e.offsetX;
    const duration = music.duration;
    music.currentTime = clickedLocation / width * duration;

    // console.log(width,clickedLocation,duration);
}
function setvolume() {
    music.volume = volume.value / 100;

    if (music.volume !== 0) {
        volumeBtn.classList = 'fas fa-volume-up'
    } else {
        volumeBtn.classList.replace('fa-volume-up', 'fa-volume-mute')
    }
}


play.addEventListener('click', audioStatus)
next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)
music.addEventListener('timeupdate',setAudioProgress)
progress.addEventListener('click',setProgress)
volume.addEventListener('change',setvolume)
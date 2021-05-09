// Get DOM element
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timeStamp = document.getElementById('timestamp')

                     //Functions

// Create func for clicking on the video
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Create func for updating play and pause
function updatePlayIcon() {
    if(video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
}

// Create func for updating the progress 
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    //  Set the Time for timestamp
    let mins = Math.floor(video.currentTime / 60)
    if (mins < 10) {
        mins = '0' + String(mins)
    }

    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs)
    }
    timeStamp.innerHTML = `${mins}:${secs}`
}

// Create function to stop the video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// Create function to update the video progress using the slider
const setVideoProgress = () => {
    video.currentTime = (+progress.value * video.duration) / 100;
}

                       // Event listners

// 1.Event listner for clicking on the video

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);


// 2.Event listner for play button
play.addEventListener('click', toggleVideoStatus)

// 3. Event Listener for Stop Button
stop.addEventListener('click', stopVideo)

// 4.Event listner for progress bar
progress.addEventListener('change',setVideoProgress)
// Simulated playlist
const playlist = [
    { title: 'Without Me', artist: 'Eminem', src: 'withoutme.mp3'},
    { title: 'This Love', artist: 'Maroon 5', src: 'thislove.mp3'},
    { title: 'Heartless', artist: 'Kanye West', src: 'heartless' },
];

let currentTrackIndex = 0;
let isPlaying = false;
let currentVolume = 50;

const audioElement = new Audio();

// Function to update UI based on playback state
const updateUI = () => {
    if (isPlaying) {
        audioElement.pause();
    } else {
        audioElement.src = playlist[currentTrackIndex].src;
        audioElement.play();
    }
    isPlaying = !isPlaying;
    updateUI();
};

// Function to play the previous track
const prevTrack = () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    if (isPlaying) {
        audioElement.src = playlist[currentTrackIndex].src;
        audioElement.play();
    }
    updateUI();
};

// Function to play the next track
const nextTrack = () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    if (isPlaying) {
        audioElement.src = playlist[currentTrackIndex].src;
        audioElement.play();
    }
    updateUI();
};

// Function to set volume
const setVolume = (value) => {
    currentVolume = value;
    audioElement.volume = value / 100;
    updateUI();
};
// ================================
// VSMusic - Music Player
// ================================

// ================================
// Elements
// ================================

const musicFiles = document.getElementById("musicFiles");
const selectMusicButton = document.getElementById("selectMusicButton");

const songList = document.querySelector(".song-list");

const audioPlayer = document.getElementById("audioPlayer");

const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");

const playButton = document.getElementById("playButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const shuffleButton = document.getElementById("shuffleButton");
const repeatButton = document.getElementById("repeatButton");

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const volumeBar = document.getElementById("volumeBar");

// ================================
// Player State
// ================================

let songs = [];
let currentSongIndex = 0;

let isShuffle = false;
let isRepeat = false;

// ================================
// Open File Picker
// ================================

selectMusicButton.addEventListener("click", () => {
  musicFiles.click();
});

// ================================
// Add Music Files
// ================================

musicFiles.addEventListener("change", (event) => {
  const files = Array.from(event.target.files);

  files.forEach((file) => {
    const song = {
      name: file.name.replace(/\.[^/.]+$/, ""),
      file: file,
      url: URL.createObjectURL(file),
    };

    songs.push(song);
  });

  renderSongList();

  if (songs.length > 0 && !audioPlayer.src) {
    loadSong(0);
  }
});

// ================================
// Display Song List
// ================================

function renderSongList() {
  songList.innerHTML = "";

  songs.forEach((song, index) => {
    const songItem = document.createElement("article");

    songItem.className = "song-item";

    songItem.innerHTML = `
            <div class="song-cover">
                <span>♪</span>
            </div>

            <div class="song-info">
                <h3>${escapeHTML(song.name)}</h3>
                <p>Local Music</p>
            </div>

            <button
                type="button"
                class="song-menu"
                aria-label="Play ${escapeHTML(song.name)}"
            >
                ▶
            </button>
        `;

    songItem.addEventListener("click", () => {
      loadSong(index);
      playSong();
    });

    songList.appendChild(songItem);
  });
}

// ================================
// Load Song
// ================================

function loadSong(index) {
  if (songs.length === 0) {
    return;
  }

  currentSongIndex = index;

  const song = songs[currentSongIndex];

  audioPlayer.src = song.url;

  songTitle.textContent = song.name;
  artistName.textContent = "Local Music";

  progressBar.value = 0;

  currentTime.textContent = "0:00";
  duration.textContent = "0:00";
}

// ================================
// Play Song
// ================================

function playSong() {
  if (songs.length === 0) {
    return;
  }

  audioPlayer.play();

  playButton.textContent = "❚❚";
}

// ================================
// Pause Song
// ================================

function pauseSong() {
  audioPlayer.pause();

  playButton.textContent = "▶";
}

// ================================
// Play / Pause
// ================================

playButton.addEventListener("click", () => {
  if (audioPlayer.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// ================================
// Previous Song
// ================================

previousButton.addEventListener("click", () => {
  if (songs.length === 0) {
    return;
  }

  currentSongIndex--;

  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }

  loadSong(currentSongIndex);
  playSong();
});

// ================================
// Next Song
// ================================

nextButton.addEventListener("click", () => {
  playNextSong();
});

// ================================
// Next Song Function
// ================================

function playNextSong() {
  if (songs.length === 0) {
    return;
  }

  if (isShuffle && songs.length > 1) {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentSongIndex);

    currentSongIndex = randomIndex;
  } else {
    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0;
    }
  }

  loadSong(currentSongIndex);
  playSong();
}

// ================================
// Automatically Play Next Song
// ================================

audioPlayer.addEventListener("ended", () => {
  if (isRepeat) {
    audioPlayer.currentTime = 0;
    playSong();
  } else {
    playNextSong();
  }
});

// ================================
// Progress Update
// ================================

audioPlayer.addEventListener("timeupdate", () => {
  if (!audioPlayer.duration) {
    return;
  }

  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;

  progressBar.value = progress;

  currentTime.textContent = formatTime(audioPlayer.currentTime);
});

// ================================
// Song Duration
// ================================

audioPlayer.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audioPlayer.duration);
});

// ================================
// Seek Song
// ================================

progressBar.addEventListener("input", () => {
  if (!audioPlayer.duration) {
    return;
  }

  audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

// ================================
// Volume
// ================================

volumeBar.addEventListener("input", () => {
  audioPlayer.volume = volumeBar.value;
});

// ================================
// Shuffle
// ================================

shuffleButton.addEventListener("click", () => {
  isShuffle = !isShuffle;

  shuffleButton.style.color = isShuffle ? "var(--accent)" : "";
});

// ================================
// Repeat
// ================================

repeatButton.addEventListener("click", () => {
  isRepeat = !isRepeat;

  repeatButton.style.color = isRepeat ? "var(--accent)" : "";
});

// ================================
// Format Time
// ================================

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// ================================
// Basic HTML Protection
// ================================

function escapeHTML(text) {
  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}

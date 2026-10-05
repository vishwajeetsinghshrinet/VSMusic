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
      artist: "Unknown Artist",
      cover: null,
      file: file,
      url: URL.createObjectURL(file),
    };

    songs.push(song);

    readMetadata(file, song);
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
  artistName.textContent = song.artist;

  const albumArt = document.querySelector(".album-art");

  if (song.cover) {
    albumArt.innerHTML = `<img src="${song.cover}" alt="Album artwork">`;
  } else {
    albumArt.innerHTML = `<span>♪</span>`;
  }

  progressBar.value = 0;

  currentTime.textContent = "0:00";
  duration.textContent = "0:00";

  updateActiveSong();
}

// ================================
// Active Song
// ================================

function updateActiveSong() {
  const songItems = document.querySelectorAll(".song-item");

  songItems.forEach((item, index) => {
    if (index === currentSongIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
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

function readMetadata(file, song) {
  jsmediatags.read(file, {
    onSuccess: function (tag) {
      const tags = tag.tags;
      console.log("PICTURE:", tags.picture);

      console.log(tags);

      const filenameData = extractFilenameMetadata(file.name);

      song.name = tags.title || filenameData.title;
      song.artist = tags.artist || filenameData.artist;

      if (tags.picture) {
        const picture = tags.picture;

        let base64String = "";

        for (let i = 0; i < picture.data.length; i++) {
          base64String += String.fromCharCode(picture.data[i]);
        }

        song.cover = `data:${picture.format};base64,${btoa(base64String)}`;
      }

      renderSongList();

      if (songs[currentSongIndex] === song) {
        loadSong(currentSongIndex);
      }
    },

    onError: function (error) {
      console.log("Metadata error:", error);
    },
  });
}

// ================================
// Extract Artist & Song From Filename
// ================================

function extractFilenameMetadata(filename) {
  // Remove file extension
  let cleanName = filename.replace(/\.[^/.]+$/, "");

  // Remove common quality information
  cleanName = cleanName.replace(/\s*\(?\b(128|192|256|320)\s*kbps?\b\)?/gi, "");

  // Artist - Song
  if (cleanName.includes(" - ")) {
    const parts = cleanName.split(" - ");

    return {
      artist: parts[0].trim(),
      title: parts.slice(1).join(" - ").trim(),
    };
  }

  // No artist detected
  return {
    artist: "Unknown Artist",
    title: cleanName.trim(),
  };
}

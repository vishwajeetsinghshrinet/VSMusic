# VSMusic

A modern, mobile-first web music player built with HTML, CSS, and Vanilla JavaScript.

## Project Status

🚧 **In Development**

VSMusic is currently being developed as a personal music player that can run directly in the browser and work with local music files.

## Current Features

- 🎵 Add local audio files
- ▶️ Play / Pause
- ⏮ Previous song
- ⏭ Next song
- 🔀 Shuffle
- 🔁 Repeat
- 🔊 Volume control
- ⏱ Song progress and seeking
- 🎧 Active song highlighting
- 👤 Artist name detection
- 🎵 Song title detection
- 📝 Filename fallback for missing metadata
- 🖼️ Embedded album artwork support
- 📱 Mobile-first responsive UI
- 🌑 Dark neumorphic design
- 📴 Offline metadata processing
- 🌐 GitHub Pages deployment

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- HTML5 Audio API
- jsmediatags
- Git & GitHub
- GitHub Pages

## Project Structure

```text
VSMusic/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── jsmediatags.min.js
├── assets/
│   ├── icons/
│   └── images/
├── manifest.json
├── service-worker.js
├── README.md
└── LICENSE
```

How Music Works

VSMusic does not upload music files to the server.

When the user selects a local audio file:

Local Music File
↓
Browser
↓
VSMusic
↓
HTML5 Audio Player

Music is played locally in the browser.

Metadata

VSMusic uses jsmediatags to read metadata from supported audio files.

It can read:

Song title
Artist
Embedded album artwork

If artist/title metadata is missing, VSMusic can extract information from the filename.

Example:

Arijit Singh - Tum Hi Ho.mp3

becomes:

Artist: Arijit Singh
Song: Tum Hi Ho
Deployment

The project is currently deployed using GitHub Pages.

The jsmediatags browser library is stored locally inside:

js/jsmediatags.min.js

No external CDN is required for metadata processing.

Current Development Stage
Completed
Project foundation
Basic music player
Neumorphic UI
Local music selection
Play/Pause
Previous/Next
Shuffle
Repeat
Progress bar
Volume control
Active song highlighting
Metadata reading
Filename metadata fallback
Local jsmediatags integration
GitHub Pages deployment
Basic responsive text handling
Next Tasks
Test thoroughly on mobile
Improve mobile UI
Improve album artwork handling
Improve music library
Add search functionality
Add playlists
Add Favorites
Add Recently Played
Add persistent music library
Add PWA support
Add offline caching
Add Media Session API
Improve background playback
Add sleep timer
Consider lyrics support
Consider equalizer/audio visualization
Development Roadmap
V0.1 — Foundation
Project structure
Basic UI
Responsive layout
V0.2 — Audio Player
Local music
Playback controls
Progress
Volume
Shuffle/Repeat
V0.3 — Music Library
Song list
Metadata
Album artwork
Search
V0.4 — Playlists
Create playlists
Favorites
Recently played
V0.5 — Mobile Experience
Mobile UI improvements
Touch controls
Responsive layouts
V0.6 — PWA
Installable app
Service worker
Offline caching
App manifest
V0.7 — Advanced Features
Background playback
Media Session API
Lyrics
Sleep timer
Equalizer
Audio visualization
Important

VSMusic is currently a browser-based personal music player.

The current version uses local audio files selected by the user. Music files are not uploaded to GitHub or any server.

const images = [
    'Images/agumbal.png',
    'Images/Backrooms.jpg',
    'Images/BasicHall.jpeg',
    'Images/ColorHouses.png',
    'Images/Exit Carpet.jpg',
    'Images/FlowerHall.png',
    'Images/GrassPlayground.jpg',
    'Images/Itspinkinside.jpg',
    'Images/itssooclean.png',
    'Images/justaflood.jpeg',
    'Images/Justahotel.jfif',
    'Images/JustaPark.jfif',
    'Images/Justbluebutyellow.png',
    'Images/JustSoGoodPlace.jpg',
    'Images/JustTooEmpty.jpg',
    'Images/LumpGrass.png',
    'Images/poolcolorslids.jpg',
    'Images/poolfrog.jpg',
    'Images/PoolHall.png',
    'Images/Poolwighall.png',
    'Images/RainbowSlids.jpg',
    'Images/Ranbowslids.png',
    'Images/SomewhereDark.jpeg',
    'Images/stayinpink.jpg',
    'Images/WeedButGrass.jpg',
    'Images/YelloHall.JPG'
];

const music = [
    'Music/bonjr - if it\'s real, then i\'ll stay.mp3',
    'Music/daniel.mp3 - green to blue.mp3',
    'Music/Hisohkah - School Rooftop (Intro) (Slowed Down).mp3',
    'Music/Instupendo - Comfort Chain.mp3',
    'Music/Instupendo - Six Forty Seven.mp3',
    'Music/Karamel Kel - Aglow (Intro) [Slowed Down Version].mp3',
    'Music/Karamel Kel - Aglow (Intro).mp3',
    'Music/reidenshi - It feels like I\'ve forgotten something.mp3',
    'Music/tilekid - you not the same.mp3',
    'Music/øneheart - apathy.mp3',
    'Music/øneheart x reidenshi - snowfall (slowed).mp3',
    'Music/øneheart x reidenshi - snowfall.mp3'
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function changeImage() {
    const imagePath = getRandomElement(images);
    document.getElementById('random-image').src = imagePath;
    document.getElementById('random-image').style.display = 'block'; // Make the image visible
}

function updateBackgroundGradient(musicPlayer) {
    const duration = musicPlayer.duration;
    const currentTime = musicPlayer.currentTime;
    let percentage = currentTime / duration;

    const timeLeft = duration - currentTime;
    const fadeDuration = 5;
    if (timeLeft <= fadeDuration) {
        percentage = timeLeft / fadeDuration * percentage;
    }

    const colorStop1 = `rgba(0, 0, 0, ${1 - percentage})`;
    const colorStop2 = `rgba(0, 0, 139, ${percentage * 0.8})`;

    document.getElementById('dynamic-background').style.background = 
        `linear-gradient(${colorStop1}, ${colorStop2})`;

    if (currentTime < duration) {
        requestAnimationFrame(() => updateBackgroundGradient(musicPlayer));
    }
}

function changeMusic() {
    const musicPath = getRandomElement(music);
    const musicPlayer = document.getElementById('random-music');
    musicPlayer.src = musicPath;
    musicPlayer.play().then(() => {
        updateBackgroundGradient(musicPlayer);
    }).catch(error => console.error("Play initiation failed:", error));

    const songName = musicPath.split('/').pop().replace(/\.[^/.]+$/, ""); // Remove file extension
    document.getElementById('song-name').innerText = songName; // Update song name
}

document.getElementById('random-music').addEventListener('ended', changeMusic);

let fadeTimeout;
document.body.addEventListener('mousemove', function() {
    const songNameElement = document.getElementById('song-name');
    clearTimeout(fadeTimeout);
    songNameElement.style.opacity = 1;
    songNameElement.style.display = 'block';

    fadeTimeout = setTimeout(() => {
        songNameElement.style.opacity = 0;
        setTimeout(() => songNameElement.style.display = 'none', 2000); // Ensure this matches the CSS transition
    }, 2000); // Time shown before starting to fade
});

document.body.addEventListener('click', function startExperience() {
    document.getElementById('start-prompt').style.display = 'none';
    document.getElementById('random-music').muted = false;
    changeMusic();
    changeImage();
    setInterval(changeImage, Math.random() * (10000 - 5000) + 5000);
}, { once: true });

let mouseTimeout;

// Function to hide the cursor
function hideCursor() {
    document.body.style.cursor = 'none';
}

// Function to reset the cursor visibility and set a timeout to hide it again
function resetCursorTimeout() {
    // First, make the cursor visible
    document.body.style.cursor = 'default';

    // Clear any existing timeout to avoid hiding the cursor while the user is active
    clearTimeout(mouseTimeout);

    // Set a new timeout to hide the cursor after 3 seconds of inactivity
    mouseTimeout = setTimeout(hideCursor, 3000);
}

// Listen for mouse movement on the entire page
document.addEventListener('mousemove', resetCursorTimeout);

// Initialize the cursor state when the page loads
resetCursorTimeout();
document.addEventListener('DOMContentLoaded', function () {
    const sounds = [
        "main-aircon.mp4", "main-birds.mp4", "main-brownnoise.mp4", 
        "main-chimesmetal.mp4", "main-cicadas.mp4", "main-city.mp4", 
        "main-crickets.mp4", "main-fanhigh.mp4", "main-fanlow.mp4", 
        "main-fire.mp4", "main-frogs.mp4", "main-people.mp4", 
        "main-pinknoise.mp4", "main-rain.mp4", "main-raincabin.mp4", 
        "main-raintinroof.mp4", "main-raintrees.mp4", "main-sbowl.mp4", 
        "main-stream.mp4", "main-thunder.mp4", "main-waterfall.mp4", 
        "main-waves.mp4", "main-whitenoise.mp4", "main-wind.mp4"
    ];

    const audioMap = {
        "main-aircon.mp4": "Air Conditioning",
        "main-birds.mp4": "Birds",
        "main-brownnoise.mp4": "Brown Noise",
        "main-chimesmetal.mp4": "Metal Chimes",
        "main-cicadas.mp4": "Cicadas",
        "main-city.mp4": "City",
        "main-crickets.mp4": "Crickets",
        "main-fanhigh.mp4": "Fan on High",
        "main-fanlow.mp4": "Fan on Low",
        "main-fire.mp4": "Fire",
        "main-frogs.mp4": "Frogs",
        "main-people.mp4": "People",
        "main-pinknoise.mp4": "Pink Noise",
        "main-rain.mp4": "Rain",
        "main-raincabin.mp4": "Rain on Cabin",
        "main-raintinroof.mp4": "Rain on Tin Roof",
        "main-raintrees.mp4": "Rain on Trees",
        "main-sbowl.mp4": "Singing Bowl",
        "main-stream.mp4": "Stream",
        "main-thunder.mp4": "Thunder",
        "main-waterfall.mp4": "Waterfall",
        "main-waves.mp4": "Waves",
        "main-whitenoise.mp4": "White Noise",
        "main-wind.mp4": "Wind"
    };

    const soundGrid = document.getElementById('sound-grid');
    const masterPlayPauseButton = document.getElementById('master-play-pause');
    const masterIcon = document.getElementById('master-icon');
    let isMasterMuted = false; // Start with sound unmuted

    // SVG icons as strings
    const playIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                            <path d="M8 5v14l11-7z"/>
                         </svg>`;
    const pauseIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                         </svg>`;

    // Function to update the master button icon
    function updateMasterIcon() {
        masterIcon.innerHTML = isMasterMuted ? playIconSVG : pauseIconSVG;
    }

    // Mute or unmute all sounds
    function toggleMuteAll(mute) {
        const allAudios = document.querySelectorAll('audio');
        allAudios.forEach(audio => {
            audio.muted = mute;
        });
    }

    // Create each sound item
    sounds.forEach((sound, index) => {
        const soundItem = document.createElement('div');
        soundItem.classList.add('sound-item');

        const soundLabel = document.createElement('div');
        soundLabel.innerText = audioMap[sound];
        soundLabel.classList.add('sound-label');
        soundItem.appendChild(soundLabel);

        const audioElement = document.createElement('audio');
        audioElement.src = `assets/audio/${sound}`;
        audioElement.id = `audio-${index}`;
        audioElement.loop = true;

        soundItem.appendChild(audioElement);

        // Play/pause audio on card click, but ignore clicks on the volume slider
        soundItem.addEventListener('click', (event) => {
            if (!event.target.classList.contains('volume-control')) {
                if (audioElement.paused) {
                    audioElement.play();
                    soundItem.classList.add('playing');
                } else {
                    audioElement.pause();
                    soundItem.classList.remove('playing');
                }
            }
        });

        const volumeControl = document.createElement('input');
        volumeControl.type = 'range';
        volumeControl.min = 0;
        volumeControl.max = 1;
        volumeControl.step = 0.01;
        volumeControl.classList.add('volume-control');
        volumeControl.value = audioElement.volume;

        // Adjust volume without affecting play/pause state
        volumeControl.addEventListener('input', (e) => {
            audioElement.volume = e.target.value;
        });

        soundItem.appendChild(volumeControl);
        soundGrid.appendChild(soundItem);
    });

    // Master mute/unmute button functionality
    masterPlayPauseButton.addEventListener('click', () => {
        isMasterMuted = !isMasterMuted;

        toggleMuteAll(isMasterMuted); // Mute or unmute all sounds

        updateMasterIcon();
    });

    // Initialize the master icon on load
    updateMasterIcon();
});

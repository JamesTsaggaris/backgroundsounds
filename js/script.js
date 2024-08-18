document.addEventListener('DOMContentLoaded', function () {
    const sounds = [
        "main-aircon.mp4",
        "main-birds.mp4",
        "main-brownnoise.mp4",
        "main-chimesmetal.mp4",
        "main-cicadas.mp4",
        "main-city.mp4",
        "main-crickets.mp4",
        "main-fanhigh.mp4",
        "main-fanlow.mp4",
        "main-fire.mp4",
        "main-frogs.mp4",
        "main-people.mp4",
        "main-pinknoise.mp4",
        "main-rain.mp4",
        "main-raincabin.mp4",
        "main-raintinroof.mp4",
        "main-raintrees.mp4",
        "main-sbowl.mp4",
        "main-stream.mp4",
        "main-thunder.mp4",
        "main-waterfall.mp4",
        "main-waves.mp4",
        "main-whitenoise.mp4",
        "main-wind.mp4"
    ]

    const soundGrid = document.getElementById('sound-grid');
    const masterPlayPauseButton = document.getElementById('master-play-pause');
    let isPlaying = false;

    sounds.forEach((sound, index) => {
        const soundItem = document.createElement('div');
        soundItem.classList.add('sound-item');

        const audioElement = document.createElement('audio');
        audioElement.src = `audio/${sound}`;
        audioElement.id = `audio-${index}`;

        const playButton = document.createElement('button');
        playButton.innerText = 'Play';
        playButton.addEventListener('click', () => {
            if (audioElement.paused) {
                audioElement.play();
                playButton.innerText = 'Pause';
            } else {
                audioElement.pause();
                playButton.innerText = 'Play';
            }
        });

        const volumeControl = document.createElement('input');
        volumeControl.type = 'range';
        volumeControl.min = 0;
        volumeControl.max = 1;
        volumeControl.step = 0.01;
        volumeControl.classList.add('volume-control');
        volumeControl.value = audioElement.volume;
        volumeControl.addEventListener('input', (e) => {
            audioElement.volume = e.target.value;
        });

        soundItem.appendChild(playButton);
        soundItem.appendChild(volumeControl);
        soundItem.appendChild(audioElement);
        soundGrid.appendChild(soundItem);
    });

    masterPlayPauseButton.addEventListener('click', () => {
        isPlaying = !isPlaying;
        const allAudios = document.querySelectorAll('audio');
        allAudios.forEach(audio => {
            if (isPlaying) {
                audio.play();
                masterPlayPauseButton.innerText = 'Pause All';
            } else {
                audio.pause();
                masterPlayPauseButton.innerText = 'Play All';
            }
        });
    });
});

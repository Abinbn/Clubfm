const audio = new Audio('https://eu10.fastcast4u.com/clubfmuae');
        const playPauseBtn = document.querySelector('.play-pause');
        const volumeBtn = document.querySelector('.volume-btn');
        const volumeSlider = document.querySelector('.volume-slider');
        const volumeSliderContainer = document.querySelector('.volume-slider-container');
        const themeToggle = document.querySelector('.theme-toggle');
        const albumArt = document.getElementById('albumArt');
        const liveDot = document.querySelector('.live-dot');

        let isPlaying = false;
        let isDarkTheme = true;

        function togglePlay() {
            if (isPlaying) {
                audio.pause();
                playPauseBtn.innerHTML = '&#9658;';
                liveDot.style.display = 'none';
            } else {
                audio.play();
                playPauseBtn.innerHTML = '&#10074;&#10074;';
                liveDot.style.display = 'block';
            }
            isPlaying = !isPlaying;
        }

        function handleVolumeChange() {
            audio.volume = volumeSlider.value;
        }

        function toggleVolumeSlider() {
            volumeSliderContainer.style.display = volumeSliderContainer.style.display === 'none' ? 'block' : 'none';
        }

        function toggleTheme() {
            isDarkTheme = !isDarkTheme;
            if (isDarkTheme) {
                document.documentElement.style.setProperty('--background-color', '#1A1A2E');
                document.documentElement.style.setProperty('--text-color', '#FFFFFF');
            } else {
                document.documentElement.style.setProperty('--background-color', '#F0F0F0');
                document.documentElement.style.setProperty('--text-color', '#333333');
            }
        }

        function handleKeyboardShortcuts(e) {
            if (e.code === 'Space') {
                e.preventDefault();
                togglePlay();
            } else if (e.code === 'ArrowUp') {
                e.preventDefault();
                volumeSlider.value = Math.min(1, parseFloat(volumeSlider.value) + 0.1);
                handleVolumeChange();
            } else if (e.code === 'ArrowDown') {
                e.preventDefault();
                volumeSlider.value = Math.max(0, parseFloat(volumeSlider.value) - 0.1);
                handleVolumeChange();
            }
        }

        function setBackgroundColor() {
            const colorThief = new ColorThief();
            const dominantColor = colorThief.getColor(albumArt);
            document.body.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
        }

        playPauseBtn.addEventListener('click', togglePlay);
        volumeBtn.addEventListener('click', toggleVolumeSlider);
        volumeSlider.addEventListener('input', handleVolumeChange);
        themeToggle.addEventListener('click', toggleTheme);
        document.addEventListener('keydown', handleKeyboardShortcuts);

        albumArt.addEventListener('load', setBackgroundColor);
        // Trigger setBackgroundColor initially
        if (albumArt.complete) {
            setBackgroundColor();
        }

        // Close volume slider when clicking outside
        document.addEventListener('click', function(event) {
            if (!volumeBtn.contains(event.target) && !volumeSliderContainer.contains(event.target)) {
                volumeSliderContainer.style.display = 'none';
            }
        });

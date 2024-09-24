document.addEventListener('DOMContentLoaded', function() {
    // Select all video elements
    const videos = document.querySelectorAll('video');

    // Function to handle video end
    function handleVideoEnd(video) {
        //video.currentTime = 0;
        video.pause();
    }

    // Function to toggle play/pause
    function toggleVideo(video) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    // Add event listeners to each general video
    videos.forEach(video => {
        // Reset video to start on end
        video.addEventListener('ended', () => {
            handleVideoEnd(video);
        });

        // Variables to track touch positions
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        const touchThreshold = 10; // Minimum movement to consider as swipe

        // Touch start event
        video.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });

        // Touch end event
        video.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;

            const deltaX = Math.abs(touchEndX - touchStartX);
            const deltaY = Math.abs(touchEndY - touchStartY);

            if (deltaX < touchThreshold && deltaY < touchThreshold) {
                // Considered a tap
                toggleVideo(video);
                e.preventDefault(); // Prevent default only for taps
            }
            // If movement is greater than threshold, it's a swipe/scroll
            // Do nothing to allow scrolling
        });

        // Click event for desktop
        video.addEventListener('click', () => {
            toggleVideo(video);
        });

        // Error handling
        video.addEventListener('error', (e) => {
            console.error(`Error loading video: ${video.currentSrc}`);
            // Optionally, display a user-friendly message
        });
    });

    // Specific handling for video1 and video2
    const video1 = document.getElementById('video1');
    const video2 = document.getElementById('video2');
    const specialVideos = [video1, video2];

    specialVideos.forEach(video => {
        if (video) {
            // Play the video initially
            video.play();

            // Pause after 4 seconds
            setTimeout(() => {
                video.pause();
            }, 4000);

            // Play on hover (desktop)
            video.addEventListener('mouseenter', () => {
                video.play();
            });

            // Pause when hover ends (desktop)
            video.addEventListener('mouseleave', () => {
                video.pause();
            });
        }
    });

    // Play All Videos button
    const playAllBtn = document.getElementById('playAllBtn');
    if (playAllBtn) {
        playAllBtn.addEventListener('click', () => {
            videos.forEach(video => {
                //video.currentTime = 0; // Reset to beginning
                video.play();
            });
        });
    }

    // Real Push-T benchmark video control
    const pushVideos = [
        document.getElementById('pushVideo1'),
        document.getElementById('pushVideo2'),
        document.getElementById('pushVideo3')
    ];

    // Additional Real Tasks video control
    const taskVideo = document.getElementById('taskVideo');
    const taskSelect = document.getElementById('taskSelect');
    const playPauseBtn = document.getElementById('playPauseBtn');

    // Function to update video source and play
    function updateVideoSource(src) {
        taskVideo.src = src;
        taskVideo.load();
        taskVideo.play().catch(e => console.error("Error playing video:", e));
    }

    // Initialize with the first video
    updateVideoSource(taskSelect.value);

    // Event listener for task selection change
    taskSelect.addEventListener('change', function() {
        updateVideoSource(this.value);
    });

    // Event listener for play/pause button
    playPauseBtn.addEventListener('click', function() {
        if (taskVideo.paused) {
            taskVideo.play().catch(e => console.error("Error playing video:", e));
            this.textContent = 'Pause';
        } else {
            taskVideo.pause();
            this.textContent = 'Play';
        }
    });

    // Update button text based on video playback status
    taskVideo.addEventListener('play', function() {
        playPauseBtn.textContent = 'Pause';
    });

    taskVideo.addEventListener('pause', function() {
        playPauseBtn.textContent = 'Play';
    });
});
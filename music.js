// ===================================================
// Wedding Background Music Interactivity (script1.js)
// ===================================================

/**
 * Audio Engine Configuration
 * Uses the local wedding audio asset path
 */
const weddingAudioSrc = "sisamouth.mp3";

// Create HTMLAudioElement instance
const weddingAudio = new Audio(weddingAudioSrc);
weddingAudio.loop = true; // Ensures continuous looping throughout guest review
weddingAudio.volume = 0.4; // Set elegant ambient volume threshold (40%)

// Create Floating Audio Control Interface Button
const audioBtn = document.createElement('button');
audioBtn.id = 'weddingAudioToggleBtn';
audioBtn.innerHTML = '🎵'; // Initial Play Music icon

// Apply inline layout styling
Object.assign(audioBtn.style, {
    position: 'fixed',
    bottom: '80px',
    left: '20px', // Moved from right to left
    zIndex: '1000',
    backgroundColor: '#800020', // Ceremony red
    color: '#ffffff',
    border: '2px solid #c5a059', // Heritage gold
    borderRadius: '50px',
    padding: '10px 18px',
    fontFamily: "'Hanuman', serif",
    fontSize: '0.88rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(128, 0, 32, 0.3)',
    transition: 'all 0.3s ease-in-out'
});

// Hover effects
audioBtn.onmouseover = () => {
    audioBtn.style.transform = 'scale(1.05)';
    audioBtn.style.backgroundColor = '#ffffff';
    audioBtn.style.color = '#800020';
};

audioBtn.onmouseout = () => {
    audioBtn.style.transform = 'scale(1)';
    audioBtn.style.backgroundColor = '#800020';
    audioBtn.style.color = '#ffffff';
};

/**
 * Toggle Audio Playback Status
 */
function toggleWeddingMusic() {
    if (weddingAudio.paused) {
        weddingAudio.play()
            .then(() => {
                audioBtn.innerHTML = '🔇'; // Click again to mute
                audioBtn.style.borderColor = '#800020';
            })
            .catch(error => {
                console.log(
                    "Autoplay context restricted by browser security policies.",
                    error
                );
                audioBtn.innerHTML = '🎵';
                audioBtn.style.borderColor = '#c5a059';
            });
    } else {
        weddingAudio.pause();
        audioBtn.innerHTML = '🎵';
        audioBtn.style.borderColor = '#c5a059';
    }
}

// Bind click event
audioBtn.addEventListener('click', toggleWeddingMusic);

// Initialize after page loads
document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(audioBtn);

    // Attempt autoplay after the first user interaction
    const initiateAutoplay = () => {
        if (weddingAudio.paused && audioBtn.innerHTML === '🎵') {
            weddingAudio.play()
                .then(() => {
                    audioBtn.innerHTML = '🔇';
                    audioBtn.style.borderColor = '#800020';
                })
                .catch(() => {
                    console.log(
                        "Ambient autoplay deferred to explicit user toggle."
                    );
                });
        }
    };

    // Unlock audio on first user click
    document.body.addEventListener('click', initiateAutoplay, { once: true });
});

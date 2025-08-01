// DOM Elements
const card = document.getElementById('card');
const openBtn = document.getElementById('openBtn');
const flipBackBtn = document.getElementById('flipBackBtn');
const confettiContainer = document.getElementById('confetti-container');

// Card flip functionality
function flipCard() {
    card.classList.toggle('flipped');
    
    // Force reflow for mobile browsers
    card.offsetHeight;
    
    // Ensure proper transform on mobile
    if (card.classList.contains('flipped')) {
        card.style.transform = 'rotateY(180deg) translateZ(0)';
        card.style.webkitTransform = 'rotateY(180deg) translateZ(0)';
    } else {
        card.style.transform = 'rotateY(0deg) translateZ(0)';
        card.style.webkitTransform = 'rotateY(0deg) translateZ(0)';
    }
}

// Confetti/Fireworks effect
function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#8a2be2', '#9370db', '#ffb6c1', '#dda0dd'];
    const shapes = ['💖', '💕', '💗', '💓', '💝', '💜', '🌸', '🌹', '⭐', '✨'];
    
    // Create multiple confetti pieces
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position
            const startX = Math.random() * window.innerWidth;
            const startY = -50;
            
            // Random properties
            const size = Math.random() * 15 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const rotation = Math.random() * 360;
            const duration = Math.random() * 2 + 2;
            
            // Set styles
            confetti.style.left = startX + 'px';
            confetti.style.top = startY + 'px';
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.background = color;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
            confetti.style.transform = `rotate(${rotation}deg)`;
            confetti.style.animationDuration = duration + 's';
            
            // Add emoji content randomly
            if (Math.random() > 0.7) {
                confetti.textContent = shape;
                confetti.style.fontSize = size + 'px';
                confetti.style.background = 'transparent';
                confetti.style.display = 'flex';
                confetti.style.alignItems = 'center';
                confetti.style.justifyContent = 'center';
            }
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, duration * 1000);
        }, i * 50);
    }
}

// Enhanced fireworks effect
function createFireworks() {
    const fireworks = ['💖', '💕', '💗', '💓', '💝', '💜', '🌸', '🌹', '⭐', '✨', '🎆', '🎇'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'fixed';
            firework.style.fontSize = '2rem';
            firework.style.pointerEvents = 'none';
            firework.style.zIndex = '1000';
            firework.textContent = fireworks[Math.floor(Math.random() * fireworks.length)];
            
            // Random position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            firework.style.left = x + 'px';
            firework.style.top = y + 'px';
            firework.style.transform = 'scale(0)';
            firework.style.transition = 'all 0.5s ease-out';
            
            document.body.appendChild(firework);
            
            // Animate in
            setTimeout(() => {
                firework.style.transform = 'scale(1.5) rotate(360deg)';
                firework.style.opacity = '0';
            }, 10);
            
            // Remove after animation
            setTimeout(() => {
                if (firework.parentNode) {
                    firework.parentNode.removeChild(firework);
                }
            }, 500);
        }, i * 100);
    }
}

// Button click effects
function addButtonEffects(button) {
    // Ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.marginLeft = '-50px';
    ripple.style.marginTop = '-50px';
    ripple.style.pointerEvents = 'none';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Event listeners
openBtn.addEventListener('click', function(e) {
    e.preventDefault();
    flipCard();
    createConfetti();
    createFireworks();
    addButtonEffects(this);
    
    // Add sound effect (optional)
    playSound();
});

flipBackBtn.addEventListener('click', function(e) {
    e.preventDefault();
    flipCard();
    addButtonEffects(this);
});

// Add card click to flip
card.addEventListener('click', function(e) {
    // Don't flip if clicking on buttons
    if (e.target.closest('button')) {
        return;
    }
    flipCard();
    if (!card.classList.contains('flipped')) {
        createConfetti();
        createFireworks();
    }
});

// Enhanced touch support for card
card.addEventListener('touchstart', function(e) {
    // Prevent default to avoid double-tap zoom
    e.preventDefault();
}, { passive: false });

card.addEventListener('touchend', function(e) {
    // Don't flip if touching buttons
    if (e.target.closest('button')) {
        return;
    }
    
    // Small delay to distinguish from swipe
    setTimeout(() => {
        flipCard();
        if (!card.classList.contains('flipped')) {
            createConfetti();
            createFireworks();
        }
    }, 100);
});

// Force hardware acceleration for mobile
card.style.transform = 'translateZ(0)';
card.style.webkitTransform = 'translateZ(0)';

// Optional sound effect
function playSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
        // Fallback if Web Audio API is not supported
        console.log('Sound effect not supported');
    }
}

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (document.activeElement === openBtn) {
            openBtn.click();
        } else if (document.activeElement === flipBackBtn) {
            flipBackBtn.click();
        }
    }
});

// Touch device support
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - flip card
            if (!card.classList.contains('flipped')) {
                openBtn.click();
            }
        } else {
            // Swipe down - flip back
            if (card.classList.contains('flipped')) {
                flipBackBtn.click();
            }
        }
    }
}

// Add some interactive hover effects
card.addEventListener('mouseenter', function() {
    if (!this.classList.contains('flipped')) {
        this.style.transform = 'scale(1.02)';
    }
});

card.addEventListener('mouseleave', function() {
    if (!this.classList.contains('flipped')) {
        this.style.transform = 'scale(1)';
    }
});

// Initialize with a subtle entrance animation
window.addEventListener('load', function() {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.8s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
});

// Add some random floating hearts in the background
function createFloatingHearts() {
    const hearts = ['💖', '💕', '💗', '💓', '💝', '💜'];
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.fontSize = '1.5rem';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '0';
            heart.style.opacity = '0.6';
            heart.style.transition = 'all 4s linear';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.style.top = '-50px';
                heart.style.opacity = '0';
            }, 100);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 4000);
        }
    }, 2000);
}

// Start floating hearts
createFloatingHearts();

// Add some sparkle effects on hover
const sparkles = ['✨', '⭐', '💫', '🌟'];
let sparkleInterval;

card.addEventListener('mouseenter', function() {
    sparkleInterval = setInterval(() => {
        if (Math.random() > 0.8) {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = '1rem';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '10';
            sparkle.style.animation = 'sparkle 1s ease-out forwards';
            
            this.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }
    }, 300);
});

card.addEventListener('mouseleave', function() {
    if (sparkleInterval) {
        clearInterval(sparkleInterval);
    }
});



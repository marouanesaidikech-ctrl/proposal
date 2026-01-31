document.addEventListener('DOMContentLoaded', function() {
    const heartsContainer = document.querySelector('.hearts-container');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const smileyFace = document.getElementById('smileyFace');
    const proposalContainer = document.querySelector('.proposal-container');
    const cat = document.getElementById('cat');
    
    let noClickCount = 0;
    let yesBtnSize = 1;
    let catMood = 'walking'; // walking, happy, sad, crying
    
    // Create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = Math.random() > 0.5 ? '❤️' : '💕';
        
        // Random position
        heart.style.left = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 20 + 15;
        heart.style.fontSize = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 3 + 5;
        heart.style.animationDuration = duration + 's';
        
        // Random animation delay
        const delay = Math.random() * 2;
        heart.style.animationDelay = delay + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 300);
    
    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 200);
    }
    
    // Yes button click handler
    yesBtn.addEventListener('click', function() {
        // Make cat happy
        updateCatMood('happy');
        
        // Hide proposal container
        proposalContainer.style.display = 'none';
        
        // Show heart eyes emoji with ticket message
        const heartEyesEmoji = document.createElement('div');
        heartEyesEmoji.className = 'heart-eyes-emoji';
        heartEyesEmoji.innerHTML = '😍';
        heartEyesEmoji.style.cssText = `
            position: fixed;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 8rem;
            z-index: 1000;
            animation: heartbeat 1s ease-in-out infinite;
        `;
        document.body.appendChild(heartEyesEmoji);
        
        // Add ticket message
        const ticketMessage = document.createElement('div');
        ticketMessage.className = 'ticket-message';
        ticketMessage.innerHTML = 'I got us the tickets moonpie';
        ticketMessage.style.cssText = `
            position: fixed;
            top: 60%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 2rem;
            color: white;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            z-index: 1000;
            animation: fadeIn 1s ease-out;
        `;
        document.body.appendChild(ticketMessage);
        
        // Create explosion of hearts
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = '❤️';
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.fontSize = Math.random() * 30 + 20 + 'px';
                heart.style.position = 'fixed';
                heart.style.transform = 'translate(-50%, -50%)';
                heart.style.animation = 'explode 1s ease-out forwards';
                heart.style.zIndex = '1000';
                
                // Random direction for explosion
                const angle = (Math.PI * 2 * i) / 30;
                const velocity = Math.random() * 300 + 200;
                const x = Math.cos(angle) * velocity;
                const y = Math.sin(angle) * velocity;
                
                heart.style.setProperty('--x', x + 'px');
                heart.style.setProperty('--y', y + 'px');
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 1000);
            }, i * 50);
        }
        
        // After 2.5 seconds, fade out and show thank you message
        setTimeout(() => {
            // Fade out emoji and message
            heartEyesEmoji.style.transition = 'opacity 0.5s ease-out';
            ticketMessage.style.transition = 'opacity 0.5s ease-out';
            heartEyesEmoji.style.opacity = '0';
            ticketMessage.style.opacity = '0';
            
            // Show thank you message
            setTimeout(() => {
                heartEyesEmoji.remove();
                ticketMessage.remove();
                
                const thankYouMessage = document.createElement('div');
                thankYouMessage.className = 'thank-you-message';
                thankYouMessage.innerHTML = 'Thank You! ❤️';
                thankYouMessage.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 4rem;
                    color: white;
                    font-weight: bold;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                    animation: fadeIn 1s ease-out;
                `;
                document.body.appendChild(thankYouMessage);
                
                // Redirect to thank you page after 2 more seconds
                setTimeout(() => {
                    window.location.href = 'thank-you.html';
                }, 2000);
            }, 500);
        }, 2500);
    });
    
    // No button click handler
    noBtn.addEventListener('click', function() {
        noClickCount++;
        
        // Update cat mood based on click count
        if (noClickCount === 1) {
            updateCatMood('sad');
        } else if (noClickCount === 2) {
            updateCatMood('sadder');
        } else if (noClickCount >= 3) {
            updateCatMood('crying');
        }
        
        // Check if we should trigger the sad explosion
        if (noClickCount >= 5) {
            triggerSadExplosion();
            return;
        }
        
        // Move no button to random position
        const maxX = window.innerWidth - noBtn.offsetWidth - 20;
        const maxY = window.innerHeight - noBtn.offsetHeight - 20;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '1000';
        noBtn.style.display = 'block'; // Ensure no button stays visible
        
        // Make yes button bigger and vibrate
        yesBtnSize += 0.3;
        yesBtn.style.transform = `scale(${yesBtnSize})`;
        yesBtn.style.fontSize = (1.2 * yesBtnSize) + 'rem';
        yesBtn.style.padding = (15 * yesBtnSize) + 'px ' + (30 * yesBtnSize) + 'px';
        
        // Add continuous vibration to yes button
        yesBtn.classList.add('vibrating');
        
        // Change yes button text based on click count
        const yesTexts = [
            'Yes',
            'Are you sure?',
            'Really sure?',
            'Think again!',
            'Last chance!',
            'Pretty please?',
            'Don\'t do this!',
            'I\'m sad now :(',
            'You\'re breaking my heart!',
            'Just say yes!'
        ];
        
        if (noClickCount <= yesTexts.length) {
            yesBtn.textContent = yesTexts[noClickCount - 1];
        }
        
        // Add shake animation to no button
        noBtn.style.animation = 'shake 0.5s';
        setTimeout(() => {
            noBtn.style.animation = '';
        }, 500);
        
        // Add glow effect to yes button
        yesBtn.style.boxShadow = `0 0 ${20 * yesBtnSize}px rgba(255, 107, 107, 0.8)`;
    });
    
    // Add shake and heartbeat animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        @keyframes heartbeat {
            0%, 100% {
                transform: translate(-50%, -50%) scale(1);
            }
            25% {
                transform: translate(-50%, -50%) scale(1.1);
            }
            45% {
                transform: translate(-50%, -50%) scale(1);
            }
            60% {
                transform: translate(-50%, -50%) scale(1.15);
            }
            80% {
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        @keyframes explode {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Function to update cat mood
    function updateCatMood(mood) {
        cat.className = 'cat ' + mood;
        catMood = mood;
        
        // The CSS handles the visual changes based on the mood class
        // No need to manually change text content since we're using CSS styling
    }
    
    // Function to trigger sad explosion
    function triggerSadExplosion() {
        // Create explosion effect
        const explosion = document.createElement('div');
        explosion.className = 'sad-explosion';
        document.body.appendChild(explosion);
        
        // Create rain effect
        const rainContainer = document.createElement('div');
        rainContainer.className = 'sad-rain';
        document.body.appendChild(rainContainer);
        
        // Create rain drops
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const rainDrop = document.createElement('div');
                rainDrop.className = 'rain-drop';
                rainDrop.style.left = Math.random() * 100 + '%';
                rainDrop.style.animationDuration = (Math.random() * 2 + 1) + 's';
                rainDrop.style.animationDelay = Math.random() * 2 + 's';
                rainContainer.appendChild(rainDrop);
            }, i * 30);
        }
        
        // Fade to sad page after 3 seconds
        setTimeout(() => {
            window.location.href = 'sad-page.html';
        }, 3000);
    }
});

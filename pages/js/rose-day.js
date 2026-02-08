document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', () => {
            welcomeScreen.classList.add('hidden');
            createConfetti();
        });
    }
    
    const sendButton = document.getElementById('sendRose');
    if (sendButton) {
        sendButton.addEventListener('click', sendVirtualRose);
    }
    
    setupColorCards();
});

function sendVirtualRose() {
    const name = document.getElementById('recipientName').value.trim();
    const color = document.getElementById('roseColor').value;
    const message = document.getElementById('personalMessage').value.trim();
    
    if (!name) {
        alert('Please enter recipient\'s name!');
        return;
    }
    
    const roseDisplay = document.getElementById('roseDisplay');
    const roseEmojis = {
        red: '🌹',
        pink: '🌸',
        white: '💐',
        yellow: '🌻'
    };
    
    const colorNames = {
        red: 'Red',
        pink: 'Pink',
        white: 'White',
        yellow: 'Yellow'
    };
    
    const defaultMessages = {
        red: 'With all my love and passion ❤️',
        pink: 'You bring joy to my life 💕',
        white: 'Pure and eternal love 🤍',
        yellow: 'You\'re an amazing friend 💛'
    };
    
    const finalMessage = message || defaultMessages[color];
    
    roseDisplay.innerHTML = `
        <div class="rose-card" style="text-align: center;">
            <h3 style="color: #c9184a; font-size: 2em;">To: ${escapeHtml(name)}</h3>
            <div style="font-size: 5em; margin: 20px 0;">${roseEmojis[color]}</div>
            <h4 style="color: #c9184a; margin: 20px 0;">${colorNames[color]} Rose</h4>
            <p style="color: #800f2f; font-size: 1.2em;">"${escapeHtml(finalMessage)}"</p>
            <p style="margin-top: 20px; font-style: italic; color: #ff4d6d;">
                Happy Rose Day! 🌹💖
            </p>
        </div>
    `;
    
    roseDisplay.classList.add('show');
    createConfetti();
    roseDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function setupColorCards() {
    const cards = document.querySelectorAll('.color-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const meaning = this.getAttribute('data-meaning');
            if (meaning) {
                createHeartBurst(this);
            }
        });
    });
}

function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const hearts = ['❤️', '💕', '💖', '💗'];
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: ${Math.random() * 15 + 15}px;
            pointer-events: none;
            z-index: 1000;
            animation: burstOut 1s ease-out forwards;
        `;
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
}

function createConfetti() {
    const colors = ['#ff4d6d', '#ffb3d9', '#ffd700', '#ffffff'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            opacity: ${Math.random() * 0.5 + 0.5};
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${Math.random() * 3 + 2}s linear;
            z-index: 10001;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to { top: 100vh; transform: rotate(720deg); }
    }
    @keyframes burstOut {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% {
            transform: translate(
                ${Math.random() * 200 - 100}px,
                ${Math.random() * 200 - 100}px
            ) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('🌹 Happy Rose Day! Made with love 💖');
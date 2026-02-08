document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    const createButton = document.getElementById('createProposal');
    createButton.addEventListener('click', createProposalMessage);
    setupTypeCards();
});

function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-bg');
    const heartEmojis = ['💕', '💖', '💗', '💝', '💘', '💞'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 25 + 20}px;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 5 + 8}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${Math.random() * 0.5 + 0.5};
        `;
        heartsContainer.appendChild(heart);
    }
}

function createProposalMessage() {
    const name = document.getElementById('partnerName').value.trim();
    const style = document.getElementById('proposalStyle').value;
    const customMsg = document.getElementById('customMessage').value.trim();
    
    if (!name) {
        showNotification('Please enter your partner\'s name! 💕', 'error');
        return;
    }
    
    const proposals = {
        romantic: `My Dearest ${name},\n\nFrom the moment I met you, I knew my life had changed forever. Every day with you is a beautiful adventure, and I can't imagine my future without you by my side. Will you make me the happiest person in the world and be mine forever? 💍❤️`,
        sweet: `Dear ${name},\n\nYou make every day brighter just by being in it. I love you more than words can express, and I want to spend the rest of my life showing you how much you mean to me. Will you be mine? 💕`,
        poetic: `To my beloved ${name},\n\nLike stars need the night sky, like flowers need the rain, my heart needs you. You are my sunrise, my moonlight, my every season. Will you complete my life's poetry and be mine forever? 🌹💖`,
        playful: `Hey ${name}! 😊\n\nSo... I've been thinking. You're pretty awesome, and I'm pretty awesome too. Together? We'd be LEGENDARY! What do you say - want to make this official and be my forever person? 💕✨`
    };
    
    let finalMessage = proposals[style];
    
    if (customMsg) {
        finalMessage += `\n\n${customMsg}`;
    }
    
    const display = document.getElementById('proposalDisplay');
    display.innerHTML = `
        <div class="proposal-card">
            <div class="proposal-header">
                <h3>💍 Your Proposal Message 💍</h3>
            </div>
            <div class="proposal-content">
                <pre>${escapeHtml(finalMessage)}</pre>
            </div>
            <div class="proposal-actions">
                <button onclick="copyProposal()" class="copy-btn">📋 Copy Message</button>
                <button onclick="shareProposal()" class="share-btn">💌 Share</button>
            </div>
        </div>
    `;
    
    display.classList.add('show');
    display.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    createConfetti();
    showNotification('Your proposal message is ready! 💍✨', 'success');
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

function copyProposal() {
    const proposalText = document.querySelector('.proposal-content pre').textContent;
    navigator.clipboard.writeText(proposalText).then(() => {
        showNotification('Copied to clipboard! 📋', 'success');
    });
}

function shareProposal() {
    showNotification('Share this special moment with your loved one! 💕', 'success');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px 30px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #ff66b2, #d81b60)' : 'linear-gradient(135deg, #ff6b6b, #ee5a6f)'};
        color: white;
        border-radius: 10px;
        font-size: 1.1em;
        font-weight: bold;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

function setupTypeCards() {
    const cards = document.querySelectorAll('.type-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            createHeartBurst(this);
        });
    });
}

function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const hearts = ['💕', '💖', '💗', '💝'];
    
    for (let i = 0; i < 10; i++) {
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
            --angle: ${(Math.PI * 2 * i) / 10}rad;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
}

function createConfetti() {
    const colors = ['#ff66b2', '#ffb3d9', '#ffd700', '#ffffff', '#ff99cc'];
    const confettiCount = 60;
    
    for (let i = 0; i < confettiCount; i++) {
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
            z-index: 1000;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    
    @keyframes confettiFall {
        to { top: 100vh; transform: rotate(720deg); }
    }
    
    @keyframes burstOut {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% {
            transform: translate(
                calc(cos(var(--angle)) * 150px),
                calc(sin(var(--angle)) * 150px)
            ) scale(0);
            opacity: 0;
        }
    }
    
    .proposal-card {
        animation: popIn 0.5s ease-out;
    }
    
    @keyframes popIn {
        0% { opacity: 0; transform: scale(0.8); }
        50% { transform: scale(1.05); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    .proposal-header {
        text-align: center;
        margin-bottom: 20px;
    }
    
    .proposal-header h3 {
        color: #d81b60;
        font-size: 2em;
    }
    
    .proposal-content {
        background: white;
        padding: 30px;
        border-radius: 10px;
        margin: 20px 0;
        border: 2px solid #ffb3d9;
    }
    
    .proposal-content pre {
        white-space: pre-wrap;
        font-family: 'Georgia', serif;
        color: #880e4f;
        font-size: 1.1em;
        line-height: 1.8;
    }
    
    .proposal-actions {
        display: flex;
        gap: 15px;
        justify-content: center;
    }
    
    .proposal-actions button {
        padding: 12px 25px;
        border: none;
        border-radius: 8px;
        font-size: 1.1em;
        cursor: pointer;
        transition: all 0.3s;
        font-weight: bold;
    }
    
    .copy-btn {
        background: linear-gradient(135deg, #42a5f5, #1976d2);
        color: white;
    }
    
    .share-btn {
        background: linear-gradient(135deg, #66bb6a, #388e3c);
        color: white;
    }
    
    .proposal-actions button:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(style);

console.log('💍 Happy Propose Day! Made with love 💕');
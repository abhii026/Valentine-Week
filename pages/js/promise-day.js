document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('button[id*="send"], button[id*="make"], button[id*="create"]');
    if(btn) btn.addEventListener('click', sendMessage);
});
function sendMessage() {
    const nameInput = document.querySelector('input[type="text"]');
    const display = document.querySelector('[id*="Display"]');
    const name = nameInput ? nameInput.value.trim() : '';
    if (!name) { alert('Please enter a name!'); return; }
    display.innerHTML = '<div style="text-align:center;"><h3 style="color:#c9184a;font-size:2em;">💖 Message Sent to ' + name + '! 💖</h3><p style="margin-top:20px;color:#800f2f;font-size:1.2em;">Your love has been delivered! ❤️</p></div>';
    display.classList.add('show');
    createConfetti();
}
function createConfetti() {
    const colors = ['#ff4d6d', '#ffb3d9', '#ffd700', '#ffffff'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = 'position:fixed;width:10px;height:10px;background:' + colors[Math.floor(Math.random()*colors.length)] + ';left:' + Math.random()*100 + 'vw;top:-10px;animation:fall ' + (Math.random()*3+2) + 's linear;z-index:1000;pointer-events:none;';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}
const style = document.createElement('style');
style.textContent = '@keyframes fall { to { top: 100vh; transform: rotate(720deg); } }';
document.head.appendChild(style);
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('createMessage').addEventListener('click', createSweetMessage);
});
function createSweetMessage() {
    const name = document.getElementById('sweetheartName').value.trim();
    const type = document.getElementById('chocolateType').value;
    const message = document.getElementById('sweetMessage').value.trim();
    if (!name) { alert('Please enter a name!'); return; }
    const messages = {
        dark: `Dear ${name}, like dark chocolate - our love is deep, intense, and unforgettable. 🍫💖`,
        milk: `Sweet ${name}, you make life as delightful as milk chocolate! 🤎💕`,
        white: `${name}, our love is pure and precious like white chocolate. 🤍✨`,
        truffle: `${name}, you deserve the finest - just like a luxury truffle! 🍬💝`
    };
    const display = document.getElementById('messageDisplay');
    display.innerHTML = `<div style="text-align:center;"><h3 style="color:#5d4037;">🍫 ${messages[type]} 🍫</h3>${message ? `<p style="margin-top:20px;color:#3e2723;">${message}</p>` : ''}</div>`;
    display.classList.add('show');
}
const canvas = document.getElementById('auroraCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let intensity = 0.5;
let colors = {
    'greenPurple': ['#00ff00', '#800080'],
    'redYellow': ['#ff0000', '#ffff00'],
    'blueWhite': ['#0000ff', '#ffffff']
};
let currentColors = colors['blueWhite'];
let yOff = 0;

function drawAurora() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let gradient = ctx.createLinearGradient(0, yOff, 0, canvas.height);
    gradient.addColorStop(0, currentColors[0]);
    gradient.addColorStop(1, currentColors[1]);

    ctx.fillStyle = gradient;
    ctx.globalAlpha = intensity;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0; // Reset alpha after drawing

    yOff += 0.5; // This will create a vertical motion effect
    if (yOff > canvas.height) yOff = 0;
    requestAnimationFrame(drawAurora);
}

function updateSettings() {
    intensity = document.getElementById('intensity').value / 10;
    const colorScheme = document.getElementById('color').value;
    currentColors = colors[colorScheme];
}

document.getElementById('intensity').addEventListener('input', updateSettings);
document.getElementById('color').addEventListener('change', updateSettings);

drawAurora();  // Start the animation

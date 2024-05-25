// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('black-hole-simulation'),
    antialias: true
});

// Load 3D black hole model
const loader = new THREE.GLTFLoader();
loader.load('models/black_hole.glb', (gltf) => {
    scene.add(gltf.scene);
});

// Set up audio
const audio = new Audio('audio/event_horizon_odyssey.wav');
audio.loop = true;
audio.play();

// Interactive elements
const stellarDebrisContainer = document.getElementById('stellar-debris-container');
const wormholePortalsContainer = document.getElementById('wormhole-portals-container');

// Gravity waves
document.addEventListener('mousemove', (event) => {
    // Update gravity waves based on mouse movement
});

// Stellar debris
stellarDebrisContainer.addEventListener('click', (event) => {
    // Create stellar debris effect
    const debris = document.createElement('img');
    debris.src = 'images/stellar_debris.png';
    debris.style.position = 'absolute';
    debris.style.top = event.clientY + 'px';
    debris.style.left = event.clientX + 'px';
    stellarDebrisContainer.appendChild(debris);
});

// Wormhole portals
wormholePortalsContainer.addEventListener('click', (event) => {
    // Create wormhole portal effect
    const portal = document.createElement('div');
    portal.style.position = 'absolute';
    portal.style.top = event.clientY + 'px';
    portal.style.left = event.clientX + 'px';
    portal.style.width = '50px';
    portal.style.height = '50px';
    portal.style.background = 'rgba(255, 255, 255, 0.5)';
    portal.style.borderRadius = '50%';
    wormholePortalsContainer.appendChild(portal);
});

// Animate the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
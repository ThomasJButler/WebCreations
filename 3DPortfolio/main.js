// Initialize the scene, camera, and renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer;

try {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);
    console.log("Renderer initialized successfully.");
} catch (e) {
    console.error("WebGL not supported", e);
    alert("WebGL not supported in this browser. Please try a different browser.");
}

// Lighting setup
const setupLights = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    console.log("Ambient light added.");

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    console.log("Point light added.");
};

setupLights();

// GLTF Loader
const loader = new THREE.GLTFLoader();

// Load a single GLTF model
loader.load('BOX.gltf', (gltf) => {
    let model = gltf.scene;
    model.position.set(0, 0, 0);
    model.rotation.set(0, 0, 0);
    model.scale.set(1, 1, 1);
    scene.add(model);
    objects.push(model);
    console.log("GLTF model loaded and added to the scene.");
}, undefined, (error) => {
    console.error("An error happened while loading the GLTF model:", error);
});

// Array to hold the objects
let objects = [];

// Set initial camera position
camera.position.z = 5;

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
console.log("Animation loop started.");

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log("Window resized.");
});

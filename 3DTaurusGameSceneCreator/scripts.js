let scene, camera, renderer, shape, material, gui, controls, envMap;
const textureLoader = new THREE.TextureLoader();
const rgbeLoader = new THREE.RGBELoader();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);

  material = new THREE.MeshStandardMaterial({
    color: 0xff00c6,
    roughness: 0.6,
    metalness: 1,
    displacementScale: 0.038,
  });
  
  // Load default brick texture
  textureLoader.load('https://threejs.org/examples/textures/brick_diffuse.jpg', (texture) => {
    material.map = texture;
    material.needsUpdate = true;
  });

  // Load default brick normal map
  textureLoader.load('https://threejs.org/examples/textures/brick_normal.jpg', (texture) => {
    material.normalMap = texture;
    material.needsUpdate = true;
  });

  // Load default brick roughness map
  textureLoader.load('https://threejs.org/examples/textures/brick_roughness.jpg', (texture) => {
    material.roughnessMap = texture;
    material.needsUpdate = true;
  });

  // Load default brick bump/displacement map
  textureLoader.load('https://threejs.org/examples/textures/brick_bump.jpg', (texture) => {
    material.bumpMap = texture;
    material.bumpScale = 0.003;
    material.displacementMap = texture;
    material.needsUpdate = true;
  });

  // Load environment map
  rgbeLoader.setDataType(THREE.UnsignedByteType)
    .load('https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr', function(texture) {
      envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.background = envMap;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
      material.envMapIntensity = 0.4;
      material.needsUpdate = true;
    });

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  createShape('Torus', 'Normal');

  camera.position.z = 3;

  // Add OrbitControls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  controls.autoRotate = true;

  setupGUI();
  animate();
}

function createShape(shapeType, resolution) {
  if (shape) scene.remove(shape);
  
  let geometry;
  const resolutionMultiplier = resolution === 'Normal' ? 1 : (resolution === '4x' ? 2 : 4);
  
  switch(shapeType) {
    case 'Sphere':
      geometry = new THREE.SphereGeometry(1, 64 * resolutionMultiplier, 64 * resolutionMultiplier);
      break;
    case 'Cube':
      geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5, 64 * resolutionMultiplier, 64 * resolutionMultiplier, 64 * resolutionMultiplier);
      break;
    case 'Torus':
      geometry = new THREE.TorusGeometry(0.7, 0.3, 64 * resolutionMultiplier, 64 * resolutionMultiplier);
      break;
  }
  
  shape = new THREE.Mesh(geometry, material);
  scene.add(shape);
}

function setupGUI() {
  gui = new dat.GUI();
  const params = {
    shape: 'Torus',
    resolution: 'Normal',
    color: '#ff00c6',
    roughness: 0.6,
    metalness: 1,
    normalScale: 1,
    bumpScale: 0.003,
    displacementScale: 0.038,
    envMapIntensity: 0.4,
    autoRotate: true,
    textureRepeat: 1
  };

  gui.add(params, 'shape', ['Sphere', 'Cube', 'Torus']).onChange(value => createShape(value, params.resolution));
  gui.add(params, 'resolution', ['Normal', '4x', '8x']).onChange(value => createShape(params.shape, value));
  gui.addColor(params, 'color').onChange(updateColor);
  gui.add(params, 'roughness', 0, 1).onChange(value => material.roughness = value);
  gui.add(params, 'metalness', 0, 1).onChange(value => material.metalness = value);
  gui.add(params, 'normalScale', 0, 2).onChange(value => {
    if (material.normalMap) material.normalScale.set(value, value);
  });
  gui.add(params, 'bumpScale', 0, 0.1).onChange(value => {
    if (material.bumpMap) material.bumpScale = value;
  });
  gui.add(params, 'displacementScale', 0, 0.1).onChange(value => {
    if (material.displacementMap) material.displacementScale = value;
  });
  gui.add(params, 'envMapIntensity', 0, 3).onChange(value => material.envMapIntensity = value);
  gui.add(params, 'autoRotate').onChange(value => controls.autoRotate = value);
  gui.add(params, 'textureRepeat', 1, 10).step(1).onChange(updateTextureRepeat);
}

function updateColor(value) {
  material.color.setHex(parseInt(value.replace('#', '0x')));
}

function updateTextureRepeat(value) {
  [material.map, material.normalMap, material.roughnessMap, material.bumpMap, material.displacementMap].forEach(map => {
    if (map) {
      map.repeat.set(value, value);
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.needsUpdate = true;
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
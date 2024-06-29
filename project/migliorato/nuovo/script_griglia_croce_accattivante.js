// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background-animation').appendChild(renderer.domElement);

// Creazione della griglia luminosa e dinamica
const grid = new THREE.Group();
const gridSize = 20; // Dimensioni della griglia
const gridSpacing = 40; // Spaziatura tra le linee della griglia
const numLines = 25; // Numero di linee per lato

const material = new THREE.LineBasicMaterial({
    color: 0xffffff, // Colore bianco
    transparent: true,
    opacity: 0.3
});

// Creazione delle linee verticali
for (let i = -numLines / 2; i <= numLines / 2; i++) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array([
        i * gridSpacing, -gridSize, 0,
        i * gridSpacing, gridSize, 0
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const line = new THREE.Line(geometry, material);
    grid.add(line);
}

// Creazione delle linee orizzontali
for (let i = -numLines / 2; i <= numLines / 2; i++) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array([
        -gridSize, i * gridSpacing, 0,
        gridSize, i * gridSpacing, 0
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const line = new THREE.Line(geometry, material);
    grid.add(line);
}

scene.add(grid);

// Posizione della telecamera
camera.position.z = 500;

// Responsive handling
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Aggiornamento delle posizioni delle linee
    grid.rotation.x += 0.002; // Rotazione della griglia lungo l'asse x
    grid.rotation.y += 0.002; // Rotazione della griglia lungo l'asse y

    renderer.render(scene, camera);
}

// Avvia l'animazione
animate();

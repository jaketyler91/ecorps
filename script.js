// Seleziona l'elemento del menu hamburger
const hamburgerMenu = document.querySelector('.hamburger-menu');
const overlay = document.querySelector('.overlay');

// Aggiungi un listener di eventi per il clic sul menu hamburger
hamburgerMenu.addEventListener('click', () => {
    // Alterna la classe 'open' per mostrare o nascondere l'overlay del menu
    overlay.classList.toggle('open');
});


// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background-animation').appendChild(renderer.domElement);

// Creazione della griglia tridimensionale
const gridSize = 20;
const gridSpacing = 50;
const gridLines = [];

const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 }); // Grigio chiaro trasparente

for (let i = -gridSize; i <= gridSize; i++) {
    for (let j = -gridSize; j <= gridSize; j++) {
        const geometryX = new THREE.BufferGeometry();
        const positionsX = [];
        positionsX.push(-gridSize * gridSpacing, i * gridSpacing, j * gridSpacing);
        positionsX.push(gridSize * gridSpacing, i * gridSpacing, j * gridSpacing);
        geometryX.setAttribute('position', new THREE.Float32BufferAttribute(positionsX, 3));
        const lineX = new THREE.Line(geometryX, material);
        scene.add(lineX);
        gridLines.push(lineX);

        const geometryY = new THREE.BufferGeometry();
        const positionsY = [];
        positionsY.push(i * gridSpacing, -gridSize * gridSpacing, j * gridSpacing);
        positionsY.push(i * gridSpacing, gridSize * gridSpacing, j * gridSpacing);
        geometryY.setAttribute('position', new THREE.Float32BufferAttribute(positionsY, 3));
        const lineY = new THREE.Line(geometryY, material);
        scene.add(lineY);
        gridLines.push(lineY);

        const geometryZ = new THREE.BufferGeometry();
        const positionsZ = [];
        positionsZ.push(i * gridSpacing, j * gridSpacing, -gridSize * gridSpacing);
        positionsZ.push(i * gridSpacing, j * gridSpacing, gridSize * gridSpacing);
        geometryZ.setAttribute('position', new THREE.Float32BufferAttribute(positionsZ, 3));
        const lineZ = new THREE.Line(geometryZ, material);
        scene.add(lineZ);
        gridLines.push(lineZ);
    }
}

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

    // Movimento delle linee
    gridLines.forEach(line => {
        line.rotation.x += 0.001;
        line.rotation.y += 0.001;
    });

    renderer.render(scene, camera);
}

// Avvia l'animazione
animate();

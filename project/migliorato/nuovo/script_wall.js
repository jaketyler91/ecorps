// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background-animation').appendChild(renderer.domElement);

// Creazione della griglia dinamica
const gridSize = 10;
const gridSpacing = 50;
const gridLines = [];

const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });

for (let i = -gridSize; i <= gridSize; i++) {
    const geometryX = new THREE.BufferGeometry();
    const positionsX = [];
    positionsX.push(-gridSize * gridSpacing, i * gridSpacing, 0);
    positionsX.push(gridSize * gridSpacing, i * gridSpacing, 0);
    geometryX.setAttribute('position', new THREE.Float32BufferAttribute(positionsX, 3));
    const lineX = new THREE.Line(geometryX, material);
    scene.add(lineX);
    gridLines.push(lineX);

    const geometryY = new THREE.BufferGeometry();
    const positionsY = [];
    positionsY.push(i * gridSpacing, -gridSize * gridSpacing, 0);
    positionsY.push(i * gridSpacing, gridSize * gridSpacing, 0);
    geometryY.setAttribute('position', new THREE.Float32BufferAttribute(positionsY, 3));
    const lineY = new THREE.Line(geometryY, material);
    scene.add(lineY);
    gridLines.push(lineY);
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

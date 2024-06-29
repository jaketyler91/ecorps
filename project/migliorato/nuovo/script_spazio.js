// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background-animation').appendChild(renderer.domElement);

// Creazione delle particelle
const particles = [];
const numParticles = 1000;
const particleSize = 2;

const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: particleSize,
    transparent: true,
    opacity: 0.8
});

const range = 1000; // Raggio di dispersione delle particelle

for (let i = 0; i < numParticles; i++) {
    const x = Math.random() * range - range / 2;
    const y = Math.random() * range - range / 2;
    const z = Math.random() * range - range / 2;

    const particleGeometry = new THREE.BufferGeometry();
    const particleVertices = new Float32Array([x, y, z]);
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particleVertices, 3));

    const particle = new THREE.Points(particleGeometry, material);
    particles.push(particle);
    scene.add(particle);
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

    // Movimento delle particelle
    particles.forEach(particle => {
        particle.rotation.x += 0.001;
        particle.rotation.y += 0.001;
    });

    renderer.render(scene, camera);
}

// Avvia l'animazione
animate();

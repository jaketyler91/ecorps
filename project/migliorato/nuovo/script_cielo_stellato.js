// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background-animation').appendChild(renderer.domElement);

// Creazione delle particelle luminose
const particles = [];
const numParticles = 500;

const material = new THREE.PointsMaterial({
    color: 0xffffff, // Colore bianco
    size: 2,
    transparent: true,
    opacity: 0.8
});

const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(numParticles * 3);

for (let i = 0; i < numParticles; i++) {
    const x = Math.random() * window.innerWidth - window.innerWidth / 2;
    const y = Math.random() * window.innerHeight - window.innerHeight / 2;
    const z = Math.random() * 800 - 400;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    particles.push({
        x,
        y,
        z,
        velocityX: Math.random() * 0.02 - 0.01,
        velocityY: Math.random() * 0.02 - 0.01
    });
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleSystem = new THREE.Points(geometry, material);
scene.add(particleSystem);

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

    // Aggiorna la posizione delle particelle
    particles.forEach(particle => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        if (particle.x < -window.innerWidth / 2 || particle.x > window.innerWidth / 2) {
            particle.velocityX *= -1;
        }
        if (particle.y < -window.innerHeight / 2 || particle.y > window.innerHeight / 2) {
            particle.velocityY *= -1;
        }
    });

    // Aggiorna le posizioni nella geometria
    for (let i = 0; i < numParticles; i++) {
        positions[i * 3] = particles[i].x;
        positions[i * 3 + 1] = particles[i].y;
        positions[i * 3 + 2] = particles[i].z;
    }
    geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

// Avvia l'animazione
animate();

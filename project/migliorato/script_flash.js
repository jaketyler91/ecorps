// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background-animation').appendChild(renderer.domElement);

// Numero di particelle
const numParticles = 1000;
const particles = [];

// Creazione della geometria della particella
const geometry = new THREE.BoxGeometry(5, 5, 5);

// Creazione del materiale della particella
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });

// Creazione delle particelle
for (let i = 0; i < numParticles; i++) {
    const particle = new THREE.Mesh(geometry, material);
    particle.position.set(
        Math.random() * window.innerWidth - window.innerWidth / 2,
        Math.random() * window.innerHeight - window.innerHeight / 2,
        Math.random() * 800 - 400
    );
    particles.push({
        mesh: particle,
        xSpeed: Math.random() * 0.2 - 0.1,
        ySpeed: Math.random() * 0.2 - 0.1,
        opacityDelta: Math.random() * 0.01 + 0.005
    });
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

    // Animazione delle particelle
    particles.forEach(particle => {
        particle.mesh.position.x += particle.xSpeed;
        particle.mesh.position.y += particle.ySpeed;

        // Wrap particles around the screen
        if (particle.mesh.position.x > window.innerWidth / 2) {
            particle.mesh.position.x = -window.innerWidth / 2;
        }
        if (particle.mesh.position.x < -window.innerWidth / 2) {
            particle.mesh.position.x = window.innerWidth / 2;
        }
        if (particle.mesh.position.y > window.innerHeight / 2) {
            particle.mesh.position.y = -window.innerHeight / 2;
        }
        if (particle.mesh.position.y < -window.innerHeight / 2) {
            particle.mesh.position.y = window.innerHeight / 2;
        }

        // Modifica dell'opacità per un effetto di dissolvenza
        if (particle.mesh.material.opacity <= 0 || particle.mesh.material.opacity >= 1) {
            particle.opacityDelta = -particle.opacityDelta;
        }
        particle.mesh.material.opacity += particle.opacityDelta;
    });

    renderer.render(scene, camera);
}

// Avvia l'animazione
animate();

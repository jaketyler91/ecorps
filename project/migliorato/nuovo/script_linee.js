// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background-animation').appendChild(renderer.domElement);

// Array di colori per le linee
const colors = [0x0077ff, 0xff7700, 0x00ff77, 0xff0077];

// Creazione delle linee
const lines = [];
const numLines = 100;

for (let i = 0; i < numLines; i++) {
    const material = new THREE.LineBasicMaterial({ color: colors[Math.floor(Math.random() * colors.length)], transparent: true, opacity: 0.5 });
    const points = [];
    points.push(new THREE.Vector3(Math.random() * window.innerWidth - window.innerWidth / 2, Math.random() * window.innerHeight - window.innerHeight / 2, Math.random() * 800 - 400));
    points.push(new THREE.Vector3(Math.random() * window.innerWidth - window.innerWidth / 2, Math.random() * window.innerHeight - window.innerHeight / 2, Math.random() * 800 - 400));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    lines.push({
        line: line,
        xSpeed: Math.random() * 0.2 - 0.1,
        ySpeed: Math.random() * 0.2 - 0.1,
        zSpeed: Math.random() * 0.2 - 0.1,
        opacityDelta: Math.random() * 0.005 + 0.002
    });
    scene.add(line);
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

    // Animazione delle linee
    lines.forEach(lineObj => {
        const line = lineObj.line;
        line.geometry.attributes.position.array[0] += lineObj.xSpeed;
        line.geometry.attributes.position.array[1] += lineObj.ySpeed;
        line.geometry.attributes.position.array[2] += lineObj.zSpeed;
        line.geometry.attributes.position.array[3] += lineObj.xSpeed;
        line.geometry.attributes.position.array[4] += lineObj.ySpeed;
        line.geometry.attributes.position.array[5] += lineObj.zSpeed;

        // Wrap around screen edges
        if (line.geometry.attributes.position.array[0] > window.innerWidth / 2 || line.geometry.attributes.position.array[0] < -window.innerWidth / 2 ||
            line.geometry.attributes.position.array[1] > window.innerHeight / 2 || line.geometry.attributes.position.array[1] < -window.innerHeight / 2) {
            line.geometry.attributes.position.array[0] = Math.random() * window.innerWidth - window.innerWidth / 2;
            line.geometry.attributes.position.array[1] = Math.random() * window.innerHeight - window.innerHeight / 2;
        }
        if (line.geometry.attributes.position.array[3] > window.innerWidth / 2 || line.geometry.attributes.position.array[3] < -window.innerWidth / 2 ||
            line.geometry.attributes.position.array[4] > window.innerHeight / 2 || line.geometry.attributes.position.array[4] < -window.innerHeight / 2) {
            line.geometry.attributes.position.array[3] = Math.random() * window.innerWidth - window.innerWidth / 2;
            line.geometry.attributes.position.array[4] = Math.random() * window.innerHeight - window.innerHeight / 2;
        }

        // Modifica dell'opacità per un effetto di dissolvenza
        if (line.material.opacity <= 0.3 || line.material.opacity >= 0.8) {
            lineObj.opacityDelta = -lineObj.opacityDelta;
        }
        line.material.opacity += lineObj.opacityDelta;

        line.geometry.attributes.position.needsUpdate = true;
    });

    renderer.render(scene, camera);
}

// Avvia l'animazione
animate();

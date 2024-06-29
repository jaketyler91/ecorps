// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background-animation').appendChild(renderer.domElement);

// Create geometry and material
const geometry = new THREE.SphereGeometry(15, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true }); // Blu
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Camera position
camera.position.z = 30;

// Responsive handling
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);

    // Animation logic
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    renderer.render(scene, camera);
};

// Start animation
animate();

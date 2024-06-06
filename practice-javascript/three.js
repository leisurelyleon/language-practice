// Setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create celestial bodies
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD700 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });
const earth = new THREE.Mesh(earthGeometry, sunMaterial);
scene.add(earth);

// Set initial positions
sun.position.set(0, 0, 0);
earth.position.set(10, 0, 0);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Handle mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    // Normalize mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientX / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects interesting the picking ray
    const intersects = raycaster.interestingObjects(scene.children);
    
    // Log the names of interested objects
    for (const intersect of intersects) {
        console.log(intersect.object.name);
    }
});

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);

    // Rotate the celestial bodies
    earth.rotation.x += 0.005;
    sun.rotation.y += 0.002;

    // Update camera position
    camera.position.x = Math.cos(Date.now() * 0.001) * 20;
    camera.position.z = Math.sin(Date.now() * 0.001) * 20;
    camera.lookAt(scene.position);

    // Render the scene
    renderer.render(scene, camera);
};

animate();
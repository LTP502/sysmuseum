var scene = new THREE.Scene() ;
var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Adjusted aspect ratio to 1
var renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 500); // Set renderer size to match container size
document.getElementById('container').appendChild(renderer.domElement);

// Create two spheres
var geometry = new THREE.SphereGeometry(1, 32, 32);
var material1 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var material2 = new THREE.MeshBasicMaterial({ color: 0xffffdd });

var sphere1 = new THREE.Mesh(geometry, material1);
sphere1.position.set(-3, 0, 0);
scene.add(sphere1);

var sphere2 = new THREE.Mesh(geometry, material2);
sphere2.position.set(3, 20, 0);
scene.add(sphere2);

// Camera starting position
camera.position.set(0, 0, 5);
camera.lookAt(scene.position);

// Animation parameters
var startingPosition = new THREE.Vector3();
var targetPosition = new THREE.Vector3();
var duration = 2000; // milliseconds
var startTime;

// Function to move camera to show the first object
function moveToFirstObject() {
    startingPosition.copy(camera.position);
    targetPosition.copy(sphere1.position).setZ(5);
    startTime = Date.now();
}

// Function to move camera to show the second object
function moveToSecondObject() {
    startingPosition.copy(camera.position);
    targetPosition.copy(sphere2.position).setZ(5);
    startTime = Date.now();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (startTime) {
        var elapsed = Date.now() - startTime;
        var t = Math.min(1, elapsed / duration);
        t = t * t * (3 - 2 * t); // ease in and out
        camera.position.lerpVectors(startingPosition, targetPosition, t);

        if (t === 1) {
            startTime = null;
        }
    }

    renderer.render(scene, camera);
}

animate();

// Event listener for button click
document.getElementById('first-object-button').addEventListener('click', moveToFirstObject);
document.getElementById('second-object-button').addEventListener('click', moveToSecondObject);

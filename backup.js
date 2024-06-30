import * as THREE from 'three'; // Adjust the path as needed
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; //importing OrbitControls

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; //to load models

/* ---------------------------- Creating Renderer ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const container = document.getElementById('container3D');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);


renderer.shadowMap.enabled = true; //enabling shadows
container.appendChild(renderer.domElement); //adding renderer to div element called container3D

renderer.setPixelRatio(window.devicePixelRatio); //setting pixel ratio


const scene = new THREE.Scene(); //creating scene

/* ---------------------------- Creating camera ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const camera = new THREE.PerspectiveCamera(
    75, //camera fov
    container.clientWidth / container.clientHeight,
    0.1, //starting view of cam
    1000 //ending view of cam
);

camera.position.set(100, 100, 100); //the camera position (x, y, z)
camera.lookAt(0, 0, 0);


/* ---------------------------- Creating lights ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//ambient light
const ambientLight = new THREE.AmbientLight(0xffffff); //creating ambient light
scene.add(ambientLight);
ambientLight.intensity = 0.5; // Set intensity of ambient light


//direcional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2); //creating directional light
scene.add(directionalLight);
directionalLight.position.set(30, 50, 0);
directionalLight.castShadow = true;


//adjusting shadow area
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.bottom = -50;
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.far = 100;
directionalLight.shadow.camera.near = 0;

//directional light helper
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight); //creating directional light helper
scene.add(dLightHelper); //to see the light source

/*import orbit camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 5;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2;
/*

/* ---------------------------- Importing 3D models ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//put models here
const models = [
    {
        url: 'models/pick.gltf', position: new THREE.Vector3(-3.75, 2, 0), //adjust placement X,Y,Z here
        scale: new THREE.Vector3(0.05, 0.05, 0.05),
        name: 'Pick a model',
        rotation: new THREE.Euler(0, 0, 0),
        color: 0xd4a373
    },

    {
        url: 'models/scene.gltf', position: new THREE.Vector3(-40, 0, 0),
        scale: new THREE.Vector3(14, 14, 14),
        name: 'Metal Pots & Pans',
        rotation: new THREE.Euler(0, 0, 0)
    }, 

    {
        url: 'models/weihan_model.glb', position: new THREE.Vector3(40, 0, 0), 
        scale: new THREE.Vector3(5, 5, 5),
        name: 'Wei Han',
        rotation: new THREE.Euler(0, 0, 0)
    },

    {
        url: 'models/baskets.glb', position: new THREE.Vector3(0, 20, 0), 
        scale: new THREE.Vector3(14, 14, 14),
        name: 'Baskets',
        rotation: new THREE.Euler(0, 0, 0)
    },

    {
        url: 'models/chair.glb', position: new THREE.Vector3(20, 20, 0), 
        scale: new THREE.Vector3(0.001, 0.001, 0.001),
        name: 'Chairs',
        rotation: new THREE.Euler(0, Math.PI / 2, 0)
    },

    {
        url: 'models/safe.glb', position: new THREE.Vector3(20, -20, 0), 
        scale: new THREE.Vector3(3, 3, 3),
        name: 'The Safe',
        rotation: new THREE.Euler(0, 0, 0)
    },

    {
        url: 'models/table.glb', position: new THREE.Vector3(-20, -20, 0), 
        scale: new THREE.Vector3(0.15, 0.15, 0.15),
        name: 'Tables',
        rotation: new THREE.Euler(0, 0, 0)
    },

];

//Loading manager
const manager = new THREE.LoadingManager();
const loader = new GLTFLoader(manager);

const modelsByName = new Map();

// Function to load a model
const loadModel = (index) => {
    const model = models[index];
    loader.load(model.url, function(glb) {
        const gltfModel = glb.scene;
        gltfModel.position.copy(model.position);
        gltfModel.scale.copy(model.scale);
        gltfModel.rotation.copy(model.rotation);
        gltfModel.castShadow = true;
        gltfModel.receiveShadow = true;
        scene.add(gltfModel);
        modelsByName.set(model.name, gltfModel);
    }, undefined, function(error) {
        console.error(`Error loading model ${index + 1}`, error);
    });
};

//Progress bar manager
const progressBar =  document.getElementById('progress-bar');
const progressBarContainer = document.querySelector('.progress-bar-container');

manager.onLoad = () => {
    progressBarContainer.style.display = 'none';
};

manager.onProgress = (url, loaded, total) => {
    progressBar.value = (loaded / total) * 100;
};

// Load all initial models
models.forEach((model, index) => {
    modelsByName.set(model.name, null);
    loadModel(index);
});

/* ---------------------------- Setting background color ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
renderer.setClearColor(0xf4f1e9, 1);

/* ---------------------------- Creating animation ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

function animate() {
    
    renderer.render(scene, camera); //adding scene and camera to renderer
}

/* ---------------------------- Parallax Animation (not using) ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
let oldx = 0
let oldy = 0
container.onmousemove = function(ev){
    let changex = ev.x - oldx
    let changey = ev.y - oldy
    camera.position.x += changex/100
    camera.position.y -= changey/100

    oldx = ev.x
    oldy = ev.y
}
*/

/* ---------------------------- Function for moving the cam when the user clicks on an object ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//varaibles for the moving camera animation
const cameraDuration = 1.5;
const tl = gsap.timeline();
var previousModelPosition = new THREE.Vector3(); // Store the previous model's position

function moveCamToObject(objectName) {
    const model = modelsByName.get(objectName);
    if (model) {
        // Calculate target position for the camera
        const targetPosition = model.position.clone().setZ(12);
        // Phase 1: Zoom out animation
        tl.to(camera.position, {
            duration: cameraDuration,
            ease: "power3.inOut",
            y: previousModelPosition.y,
            z: 12,

            onStart: function () {
                // Stop the model from spinning on start of the animation
                gsap.killTweensOf(model.rotation);
            },

            onUpdate: function () {
                // During zoom-out, keep looking at the previous model
                camera.lookAt(previousModelPosition);
            },
            
        });

        // Phase 2: Move camera to the target model
        tl.to(camera.position, {
            duration: cameraDuration,
            ease: "power3.inOut",
            x: targetPosition.x,
            y: targetPosition.y,
            z: targetPosition.z,
        });

        // Phase 3: Zoom in animation and continue tracking the model
        tl.to(camera.position, {
            duration: cameraDuration,
            ease: "power3.inOut",
            y: targetPosition.y + 3,
            z: 7,
            onUpdate: function () {
                // During zoom-in, keep looking at the model
                camera.lookAt(model.position);

                // Store the position of the current model as previous model's position
                previousModelPosition.copy(model.position);
            },
            onComplete: function () {

                // Make the model start spinning slowly
                gsap.to(model.rotation, {
                    duration: 5,
                    ease: "power1.inOut",
                    y: "+=6.28",
                    repeat: -1,
                    yoyo: true
                });
            },
        });

    } else {
        console.error(`Invalid object name: ${objectName}`);
    }
}

/* ---------------------------- Function to move the camera to the initial position when page loads ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
function initialMoveCam() {
    gsap.to(camera.position, { 
        duration: 5, 
        ease: "power3.inOut",
        x: 0,
        y: 1.5, 
        z: 10,
        onUpdate: function () {
            // Keep looking at the center of the scene while moving the camera
            camera.lookAt(0, 0, 0);
        },
    });
}
/* ---------------------------- Function calls ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

renderer.setAnimationLoop(animate); //calling the function

initialMoveCam();

//Connected to sections.html
// Event listener for object select change
objectSelect.addEventListener('change', () => {
    const selectedObject = objectSelect.value;
    // Assuming you have a function in your 3D environment to load/display objects
    moveCamToObject(selectedObject);
});


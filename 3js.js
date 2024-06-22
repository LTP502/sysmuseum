import * as THREE from './build/three.module.js'; // Adjust the path as needed
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; //importing OrbitControls
import * as dat from 'dat.gui'; //importing dat.gui

import img1 from './img/say_something.png';
import img2 from './img/drake_no.png';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

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
    window.innerWidth / window.innerHeight,
    0.0001, //starting view of cam
    1000 //ending view of cam
);

const orbit = new OrbitControls(camera, renderer.domElement); //creating orbit controls for camera

camera.position.set(0, 5, 10); //the camera position (x, y, z)
orbit.update(); //updating orbit controls


const axesHelper = new THREE.AxesHelper(5); //creating axes (the 3 dimensions lines)
scene.add(axesHelper); //adding axes to scene

/* ---------------------------- Creating sphere ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50); //creating sphere
const sphereMaterial = new THREE.MeshStandardMaterial({ //MeshStandardMaterial/Lambart needs a light source
    color: 0x0000ff, 
    wireframe: false
}); //creating material for sphere

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); //creating mesh by combining material with sphere
scene.add(sphere); //adding sphere to scene
sphere.position.set(0, 2, 0);
sphere.castShadow = true;

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
//shadow helper
const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera); //creating directional light helper
scene.add(dLightShadowHelper); //to see the shadow boundaries of the light source


/*
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.castShadow = true;

// Adjust shadow settings
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 1000;
spotLight.shadow.camera.fov = 45;

// Add light to scene
scene.add(spotLight);

const sLightHelper = new THREE.SpotLightHelper(spotLight); //creating spot light helper
scene.add(sLightHelper);

// function to log errors with spot light
function logSpotLightErrors(light, message) {
    if (light.shadow.map && light.shadow.map.depthTexture !== null) {
        console.log(`${message}: Shadow map is ready`);
    } else {
        console.error(`${message}: Shadow map is not ready`);
    }
}

logSpotLightErrors(spotLight, 'Spot Light');
*/

/* ---------------------------- Creating fog ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);


/* ---------------------------- Setting background color ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
renderer.setClearColor(0x000000, 1);

/* ---------------------------- Setting background img ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//const textureLoader = new THREE.TextureLoader();
//scene.background = textureLoader.load(img2);

/*const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    img1, 
    img1, 
    img2, 
    img2, 
    img2, 
    img2
]);
scene.background = cubeTexture;*/

/* ---------------------------- Importing 3D models ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const models = [
    {url: 'pot.glb', position: new THREE.Vector3(-20, 0, 0)},
    {url: '9v.glb', position: new THREE.Vector3(20, 0, 0)}
];

let currentModelIndex = 0;

const loadModel = (index) => {
    const loader = new GLTFLoader()
    loader.load(models[index].url, function(glb) {
        const model = glb.scene;
        model.position.copy(models[index].position);
        // Adjust the scale or perform any other modifications as needed
        model.scale.set(0.1, 0.1, 0.1);
        scene.add(model);
        currentModelIndex = index;
    }, undefined, function(error) {
        console.error(`Error loading model${index+1}`, error);
    });
};

// Load initial models
models.forEach((model, index) => loadModel(index));


/* ---------------------------- Creating GUI to switch models ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* ---------------------------- Creating gui ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const gui = new dat.GUI();

//creating option
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01
};

//color chnaging function
gui.addColor(options, 'sphereColor').onChange(function(e) {
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e) {
    sphere.material.wireframe = e;
})

gui.add(options, 'speed', 0, 0.1);

const params = {
    switchModel: function() {
        const nextIndex = (currentModelIndex + 1) % models.length;
        scene.remove(scene.children[currentModelIndex]);
        loadModel(nextIndex);
    }
};

gui.add(params, 'switchModel');


/* ---------------------------- Creating plane ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const planeGeometry = new THREE.PlaneGeometry(100, 100); //creating plane
const planeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x000000, 
    side: THREE.DoubleSide 
}); //creating material for plane

const plane = new THREE.Mesh(planeGeometry, planeMaterial); //creating mesh by combining material with plane
scene.add(plane);
plane.rotation.x = 90;
plane.position.y = -4;
plane.receiveShadow = true;

/* ---------------------------- Creating grid ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//const gridhelper = new THREE.GridHelper(100); //creating grid
//scene.add(gridhelper);

/* ---------------------------- Creating animation ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//function to animate the box and sphere
let step = 0;
function animate(time) {

    step += options.speed;
    sphere.rotation.y = step;

    renderer.render(scene, camera); //adding scene and camera to renderer
}

renderer.setAnimationLoop(animate); //calling the function
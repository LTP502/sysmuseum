import * as THREE from 'three'; //importing three.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; //importing OrbitControls
import * as dat from 'dat.gui'; //importing dat.gui

import img1 from './img/say_something.png';
import img2 from './img/drake_no.png';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/* ---------------------------- Creating Renderer ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const renderer = new THREE.WebGLRenderer({ alpha:true, antialias: true}); //creating renderer
renderer.shadowMap.enabled = true; //enabling shadows
renderer.setSize(window.innerWidth, window.innerHeight); //setting renderer size

document.getElementById('container3D').appendChild(renderer.domElement); //adding renderer to div element called container3D

const scene = new THREE.Scene(); //creating scene

/* ---------------------------- Creating camera ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const camera = new THREE.PerspectiveCamera(
    75, //camera fov
    window.innerWidth / window.innerHeight,
    0.0001, //starting view of cam
    1000 //ending view of cam
);

const orbit = new OrbitControls(camera, renderer.domElement); //creating orbit controls for camera

camera.position.set(0, 2, 5); //the camera position (x, y, z)
orbit.update(); //updating orbit controls


const axesHelper = new THREE.AxesHelper(5); //creating axes (the 3 dimensions lines)
scene.add(axesHelper); //adding axes to scene

/* ---------------------------- Creating sphere ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const sphereGeometry = new THREE.SphereGeometry(4, 100, 100); //creating sphere
const sphereMaterial = new THREE.MeshStandardMaterial({ //MeshStandardMaterial/Lambart needs a light source
    color: 0x0000ff, 
    wireframe: false
}); //creating material for sphere

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); //creating mesh by combining material with sphere
scene.add(sphere); //adding sphere to scene
sphere.position.set(30, 30, 0);
sphere.castShadow = true;

/* ---------------------------- Creating lights ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//ambient light
const ambientLight = new THREE.AmbientLight(0xffffff); //creating ambient light
scene.add(ambientLight);
ambientLight.intensity = 1; // Set intensity of ambient light


//direcional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 5); //creating directional light
scene.add(directionalLight);
directionalLight.position.set(30, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024; // Shadow map width
directionalLight.shadow.mapSize.height = 1024; // Shadow map height


//adjusting shadow area
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.bottom = -50;
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.far = 100;
directionalLight.shadow.camera.near = 0;

//directionla light helper
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight); //creating directional light helper
scene.add(dLightHelper); //to see the light source
//shadow helper
const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera); //creating directional light helper
scene.add(dLightShadowHelper); //to see the shadow boundaries of the light source


/*
const spotLight = new THREE.SpotLight(0xffffff); //creating spot light
scene.add(spotLight);
spotLight.position.set(0, 30, 0);
spotLight.intensity = 2; // Set intensity of spot light

const sLightHelper = new THREE.SpotLightHelper(spotLight); //creating spot light helper
scene.add(sLightHelper);
*/

/* ---------------------------- Creating fog ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);


/* ---------------------------- Setting background color ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
//renderer.setClearColor(0xFFEA00, 1);

/* ---------------------------- Setting background img ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(img2);

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

/* ---------------------------- Adding 3D model ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const loader = new GLTFLoader()
loader. load('dino.gltf', 

function(gltf){
    console. log(gltf)
    const model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1); //adjusting the scale of the model to be smaller
    scene.add(model);

    // Enable shadow casting and receiving
    model.traverse((node) => {
        if (node.isMesh) {

            BufferGeometryUtils.mergeVertices(node.geometry);


            // Apply smooth shading
            node.material.flatShading = false;

            node.castShadow = true;
            node.receiveShadow = true;
            node.flatShading = false ; //to use smooth shading;
        }
    });
}, 
function (xhr){
     console.log((xhr.loaded/xhr.total * 100) + "% loaded")
    }, function(error){
        console.log('An error occurred', error)
},

// Options object
{ binary: true }
)


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

/* ---------------------------- Creating plane ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const planeGeometry = new THREE.PlaneGeometry(100, 100); //creating plane
const planeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff, 
    side: THREE.DoubleSide 
}); //creating material for plane

const plane = new THREE.Mesh(planeGeometry, planeMaterial); //creating mesh by combining material with plane
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
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
    sphere.position.y = 10 * Math.abs(Math.sin(step)); //making sphere move up and down (bounce)

    renderer.render(scene, camera); //adding scene and camera to renderer
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(animate); //calling the function
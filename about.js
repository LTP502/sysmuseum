const panorama = new PANOLENS.ImagePanorama( 'img/panorama.jpg' );
let imageContainer = document.querySelector('.container3D2')

//the initial lookat postition og the camera
var lookAtPositions = [
    new THREE.Vector3(10, -6, 35)
];

const infospot = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
infospot.position.set(1000, 300, 3000);

panorama.add( infospot );

const viewer = new PANOLENS.Viewer({
    container: imageContainer,
    autoRotate: false,
    controlBar: true,
    cameraFov: 80,
    controlConfig: {
        'pan': true,
        'zoom': true,
        'rotate': true,
        'fullscreen': true
    }
});

panorama.addEventListener( 'enter-fade-start', function(){
    viewer.tweenControlCenter( lookAtPositions[0], 0 );
  } );

viewer.add( panorama );
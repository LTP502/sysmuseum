const panorama = new PANOLENS.ImagePanorama( 'img/paranoma.jpg' );
let imageContainer = document.querySelector('.container3D2')

const viewer = new PANOLENS.Viewer({
    container: imageContainer,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    controlBar: true,
});
viewer.add( panorama );
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x48dbfb)


// Camera
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  1000
); // props(viewing frustum) : FOV, Aspect ratio, near plane, far plane
camera.position.set(0, 2, 5);



// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true, // to minimize the distortions while rendering our 3D model
  alpha: true //to make threeJS background transparent
});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding  //////AMAZING THING
document.body.appendChild(renderer.domElement);




//Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;




//GLTF Loader
let model;
const loader = new GLTFLoader();
loader.load('/scene.gltf', function (gltf) {  // PROPS :(url : String, onLoad : Function, onProgress : Function, onError : Function )
  model = gltf.scene;
  console.log(model)
  model.castShadow = true;
  model.receiveShadow = true;
  model.position.set(0, -0.5, 0);
  model.scale.set(0.01, 0.01, 0.01);
  scene.add(model);



  model.traverse(function (child) {

    if (child.isMesh) {
      child.material.wireframe = false;
      child.material.flatSahding = false;
    }
  })

  renderer.render(scene, camera)

  animate();

})

// Responsiveness :
window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

};


// Animate
const animate = function () {
  requestAnimationFrame(animate);

  controls.update();

  model.rotation.y += 0.005;

  renderer.render(scene, camera);
};



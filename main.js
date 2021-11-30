import * as THREE from 'https://cdn.skypack.dev/three@0.135.0';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera( 
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000 
  ); // props(viewing frustum) : FOV, Aspect ratio, near plane, far plane


// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( innerWidth, innerHeight );
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild( renderer.domElement );


// 3D Model
const geometry = new THREE.SphereGeometry( 1, 40, 40 );
const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color(0x00ff00)
material.metalness = 1;
material.wireframe = true;
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh ); // adding our mesh into the scene

// Lights

//Light 1
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

camera.position.z = 3;

// Animate
const animate = function(){
  requestAnimationFrame( animate );

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();



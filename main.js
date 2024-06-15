import * as THREE from 'three';
import { OrbitControls } from '/assets/OrbitControls.js';
let bot//, angle = 0
const scene = new THREE.Scene();
scene.background = new THREE.Color('white');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true;
renderer.setSize(window.innerWidth, window.innerHeight);
//console.log(renderer);
//window.rd = renderer;
document.getElementById('scene-container').appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.listenToKeyEvents(window);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;

//controls.minDistance = 100;
//controls.maxDistance = 500;

controls.maxPolarAngle = Math.PI / 2;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial ({ color: 0xffffff, transparent:true, opacity:0.4 }); //MeshPhongMaterial
const cube = new THREE.Mesh( geometry, material ); 
cube.position.y = 3
scene.add( cube );

const mzgeo = new THREE.BoxGeometry(0.2, 0.3, 0.2);
const mzmtrl = new THREE.MeshStandardMaterial ({ color: 0x0088ff }); //MeshPhongMaterial

for (var i = 0; i < 50; i++) {
  for (var j = 0; j < 50; j++) {
    if (maze[i][j] == 255){
      let wall = new THREE.Mesh( mzgeo, mzmtrl ) 
      wall.position.x = i/5 - 5 + 0.1
      wall.position.z = j/5 - 5 + 0.1
      wall.position.y = 0.15
      scene.add( wall );
    }
    if (maze[i][j] == 100) {
      bot = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshStandardMaterial ({ color: 0x00ff00 }))
      bot.position.x = i / 5 - 5 + 0.1
      bot.position.z = j / 5 - 5 + 0.1
      bot.position.y = 0.1
      scene.add(bot);
      
    }
  }
}

const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
dirLight1.position.set(1, 1, 1);
scene.add(dirLight1);
const dirLight2 = new THREE.DirectionalLight(0x33ff77, 3);
dirLight1.position.set(0, 1, 1);
scene.add(dirLight2);
camera.position.x = 6;
camera.position.y = 3;
camera.position.z = -6;


var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Function to handle mouse move event
function onMouseMove(event) {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster with the mouse position
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections
  var intersects = raycaster.intersectObject(cube);

  // If there is an intersection, the mouse is near the cube
  if (intersects.length > 0) {
    console.log("Proximity detected!", intersects[0].distance);
  }
}

// Add event listener for mouse move event
window.addEventListener('mousemove', onMouseMove, false);
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  cube.rotation.x += 0.01; 	
  cube.rotation.y += 0.01; 
  
  //bot.position.x += 0.001; 	
  //bot.position.z -= 0.001;
  bot.position.x += Math.cos(angle) * 0.01;
  bot.position.z += Math.sin(angle) * 0.01;
  bot.rotation.y = -angle //-= 0.01//angle


  //sensor.position.copy(camera.position)
  //console.log(camera.position)
  renderer.render(scene, camera);
}
animate();

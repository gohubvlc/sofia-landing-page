var canvas;
var width;
var height;
var renderer;
var composer;
var glitchPass;
var scene;
var camera;
var light;
var light;
var light2;
var geometry;
var shape;
var material;
var material2;

var el;
var text;

el = document.getElementById("text-shuffle");

create();
postprocessing();

function create() {
  // CANVAS
  canvas = document.querySelector("#scene");
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;
  // RENDER
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  // SCENE
  scene = new THREE.Scene();
  // CAMERA
  camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 10000);
  camera.position.set(-100, 0, 300);
  // LIGHTS
  light = new THREE.HemisphereLight(0xE43A44, 0xE43A44, 0.2);
  scene.add(light);
  light = new THREE.DirectionalLight(0x6552A2, 0.5);
  light.position.set(200, 300, 400);
  scene.add(light);
  light2 = light.clone();
  light2.position.set(-200, 300, 400);
  scene.add(light2);
  // GEOMETRY
  geometry = new THREE.IcosahedronGeometry(190, 5);
  for (var i = 0; i < geometry.vertices.length; i++) {
    var vector = geometry.vertices[i];
    vector._o = vector.clone();
  }
  // MATERIALS
  material = new THREE.MeshPhongMaterial({
    emissive: 0xee7a56,
    emissiveIntensity: 0.4,
    shininess: 0
  });
  material2 = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0x9d553f
  });
  
  // SHAPE
  shape = new THREE.Mesh(geometry, material);
  scene.add(shape);
  shape.position.x = -100;
}

var texture, material3, plane;

var spriteMap;
var spriteMaterial;
var sprite;

function glitchStart() {
  //console.log("glitchStart");
  cambiaMaterial();
}

function glitchStop() {
  //console.log("glitchStop");
}

function postprocessing() {
  composer = new THREE.EffectComposer(renderer);
  composer.addPass(new THREE.RenderPass(scene, camera));
  glitchPass = new THREE.GlitchPass();
  glitchPass.renderToScreen = true;
  glitchPass.refParent = this;
  composer.addPass(glitchPass);
  glitchPass.goWild = false;
}

function updateVertices(a) {
  
  for (var i = 0; i < geometry.vertices.length; i++) {
    var vector = geometry.vertices[i];
    vector.copy(vector._o);
    var perlin = noise.simplex3(
      vector.x * 0.006 + a * 0.0002,
      vector.y * 0.006 + a * 0.0003,
      vector.z * 0.006
    );
    var ratio = perlin * 0.4 * (mouse.y + 0.1) + 0.8;
    //console.log(perlin);
    vector.multiplyScalar(ratio);
  }
  geometry.verticesNeedUpdate = true;
}

function render(a) {
  requestAnimationFrame(render);
  updateVertices(a);
  //renderer.render(scene, camera);

  composer.render();
}

var mouse = new THREE.Vector2(0.8, 0.5);
function onMouseMove(e) {
  TweenMax.to(mouse, 0.8, {
    y: e.clientY / height,
    x: e.clientX / width,
    ease: Power1.easeOut
  });
  //console.log(mouse);
}

requestAnimationFrame(render);
window.addEventListener("mousemove", onMouseMove);

window.addEventListener("resize", function() {
  canvas.style.width = "";
  canvas.style.height = "";
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  //renderer.setSize(width, height);
  composer.setSize(width, height);
});

var wiraframeMaterial = false;

function cambiaMaterial() {
  wiraframeMaterial = !wiraframeMaterial;
  if (wiraframeMaterial) {
    shape.material = material2;
    el.innerHTML = "Social Fire Alarm";
  } else {
    el.innerHTML = "Your collaborative<br /><b>Fire Prevention</b> Intelligence";
    shape.material = material;
  }

  el = document.getElementById("text-shuffle");
  text = new ShuffleText(el);
  text.start();
}

var camera;
var renderer;
var scene;
var pivot;
var cameraControls;
var clock = new THREE.Clock();

var boxes = [];
var objects = [];

function init() {
	var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;
    var aspectRatio = innerWidth / innerHeight;

    //Renderer:
	renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setClearColor(0xFFFFFF);
    renderer.setSize(innerWidth, innerHeight);

    //Camera:
    camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 20000);
    camera.position.set(400, 800, 800);

    //CameraControls:
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	
    // addEventListeners();
}

function addToDOM() {
	var container = document.getElementById("container");
    container.appendChild(renderer.domElement);

 //    stats = new Stats();
 //    stats.domElement.style.position = 'absolute';
 //    stats.domElement.style.top = '0px';
	// stats.domElement.style.left = '10px'; 
 //    container.appendChild(stats.domElement);
}

function drawScene() {
	scene = new THREE.Scene();
	createLights();

	makeBoxes();
	
	pivot = new THREE.Object3D();
	scene.add(pivot);
	// Draw boxes
	for (var i=0; i<27; i++) {
		scene.add(boxes[i]);
	}
	// scene.add(boxes[0]);
	// console.log(boxes.length);
}

function animate() {
	window.requestAnimationFrame(animate);
	render();
}

var obj;
function createLights()
{
    //Lights
    var ambientLight = new THREE.AmbientLight(0x333333);
	scene.add(ambientLight);
	
    obj = new THREE.Object3D();
	var spotlight = new THREE.SpotLight(0xFFFFFF, 0.99225);
	spotlight.position.set(100,100,100);
	spotlight.angle = 60 * Math.PI / 180;
	spotlight.exponent = 100;
	spotlight.target.position.set(0,0,0);
	
	var spotlight2 = new THREE.SpotLight(0xFFFFFF, 0.99225);
	spotlight.position.set(100,100,250);
	spotlight.angle = 60 * Math.PI / 180;
	spotlight.exponent = 100;
	spotlight.target.position.set(0,0,0);
	
	obj.add(spotlight);
	obj.add(spotlight2);
	scene.add(obj);
}

function makeBoxes() {
	var boxGeo = new THREE.BoxGeometry( 100, 100, 100, 15, 15, 15 );
	var boxColors = setBoxColors();
	for (var i=0; i<27; i++) {
		var box = new THREE.Mesh(boxGeo, boxColors[i]);
		boxes.push(box);
	}

	//Front face
	boxes[0].position.set(0,110,110);
	boxes[1].position.set(-110,110,110);
	boxes[2].position.set(-110,0,110);
	boxes[3].position.set(-110,-110,110);
	boxes[4].position.set(0,-110, 110);
	boxes[5].position.set(110,-110,110);
	boxes[6].position.set(110,0,110);
	boxes[7].position.set(110,110,110);
	boxes[8].position.set(0,0,110);
	
	//Middle Face
	boxes[9].position.set(0,110,0);
	boxes[10].position.set(-110,110,0);
	boxes[11].position.set(-110,0,0);
	boxes[12].position.set(-110,-110,0);
	boxes[13].position.set(0,-110, 0);
	boxes[14].position.set(110,-110,0);
	boxes[15].position.set(110,0,0);
	boxes[16].position.set(110,110,0);
	boxes[17].position.set(0,0,0);
	
	//Back Face
	boxes[18].position.set(0,110,-110);
	boxes[19].position.set(-110,110,-110);
	boxes[20].position.set(-110,0,-110);
	boxes[21].position.set(-110,-110,-110);
	boxes[22].position.set(0,-110, -110);
	boxes[23].position.set(110,-110,-110);
	boxes[24].position.set(110,0,-110);
	boxes[25].position.set(110,110,-110);
	boxes[26].position.set(0,0,-110);
}

function render() {
	var delta = clock.getDelta();
    cameraControls.update(delta);	

	obj.position.copy(camera.position);
	renderer.render(scene, camera);
}

function setBoxColors() {
	var boxColors = [];

	var materials = [
		new THREE.MeshPhongMaterial({ color:0xC41E3A , shininess:0.4, specular:0x009900 }), // red
		new THREE.MeshPhongMaterial({ color:0x009E60 , shininess:0.4, specular:0x009900 }), // green
		new THREE.MeshPhongMaterial({ color:0x0051BA , shininess:0.4, specular:0x009900 }), // blue
		new THREE.MeshPhongMaterial({ color:0xFF5800 , shininess:0.4, specular:0x009900 }), // orange
		new THREE.MeshPhongMaterial({ color:0xFFD500 , shininess:0.4, specular:0x009900 }), // yellow
		new THREE.MeshPhongMaterial({ color:0xFFFFFF , shininess:0.4, specular:0x009900 }), // white
		new THREE.MeshPhongMaterial({ color:0x000000 , shininess:0.4, specular:0x009900 }) // black
	];
	
	var box = [];
	// front top middle box
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[0]);
	box.push(materials[6]);
	box.push(materials[1]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// front top left box
	box = [];
	box.push(materials[6]);
	box.push(materials[2]);
	box.push(materials[0]);
	box.push(materials[6]);
	box.push(materials[1]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// front middle left box
	box = [];
	box.push(materials[6]);
	box.push(materials[2]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[1]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// front bottom left box
	box = [];
	box.push(materials[6]);
	box.push(materials[2]);
	box.push(materials[6]);
	box.push(materials[3]);
	box.push(materials[1]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// front bottom middle box
	box = [];
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[3]);
	box.push(materials[1]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// front bottom right box
	box = [];
	box.push(materials[4]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[3]);
	box.push(materials[1]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// front middle right box
	box = [];
	box.push(materials[4]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[1]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// front top right box
	box = [];
	box.push(materials[4]);
	box.push(materials[6]);
	box.push(materials[0]);
	box.push(materials[6]);
	box.push(materials[1]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// front middle middle box
	box = [];
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[1]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// middle top middle box
	box = [];
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[0]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// middle top left box
	box = [];
	box.push(materials[6]);
	box.push(materials[2]);
	box.push(materials[0]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// middle middle left box
	box = [];
	box.push(materials[6]);
	box.push(materials[2]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// middle bottom left box
	box = [];
	box.push(materials[6]);
	box.push(materials[2]);
	box.push(materials[6]);
	box.push(materials[3]);
	box.push(materials[6]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// middle bottom middle box
	box = [];
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[3]);
	box.push(materials[6]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// middle bottom right box
	box = [];
	box.push(materials[4]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[3]);
	box.push(materials[6]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// middle middle right box
	box = [];
	box.push(materials[4]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// middle top right box
	box = [];
	box.push(materials[4]);
	box.push(materials[6]);
	box.push(materials[0]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// center box
	box = [];
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// back top middle box
	box = [];
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[0]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[5]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// back top left box
	box = [];
	box.push(materials[6]);
	box.push(materials[2]);
	box.push(materials[0]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[5]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// back middle left box
	box = [];
	box.push(materials[6]);
	box.push(materials[2]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[5]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// back bottom left box
	box = [];
	box.push(materials[6]);
	box.push(materials[2]);
	box.push(materials[6]);
	box.push(materials[3]);
	box.push(materials[6]);
	box.push(materials[5]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// back bottom middle box
	box = [];
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[3]);
	box.push(materials[6]);
	box.push(materials[5]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// back bottom right box
	box = [];
	box.push(materials[4]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[3]);
	box.push(materials[6]);
	box.push(materials[5]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// back middle right box
	box = [];
	box.push(materials[4]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[5]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// back top right box
	box = [];
	box.push(materials[4]);
	box.push(materials[6]);
	box.push(materials[0]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[5]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	// back middle middle box
	box = [];
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[6]);
	box.push(materials[5]);
	boxColors.push(new THREE.MeshFaceMaterial(box));

	return boxColors;
}
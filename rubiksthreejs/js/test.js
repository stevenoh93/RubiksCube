var camera;
var scene;
var renderer;

function drawScene() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	renderer = new THREE.WebGLRenderer();
	var boxGeo = new THREE.BoxGeometry( 1,1,1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
	var cube = new THREE.Mesh( boxGeo, material );
	scene.add(cube);
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	renderer.render(scene, camera);
}
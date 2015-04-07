var camera;
var renderer;
var scene;

function fillScene() {
	scene = new THREE.Scene();


}

function makeBoxes() {
	var boxGeo = new THREE.BoxGeometry( 100, 100, 100, 15, 15, 15 );
	var boxMaterial = setBoxMaterial();

}

function setBoxMaterial() {
	var boxes = [];

	var materials = [
		new THREE.MeshPhongMaterial({ color:0xC41E3A , shininess:0.4, specular:0x009900 }), // red
		new THREE.MeshPhongMaterial({ color:0x009E60 , shininess:0.4, specular:0x009900 }), // green
		new THREE.MeshPhongMaterial({ color:0x0051BA , shininess:0.4, specular:0x009900 }), // blue
		new THREE.MeshPhongMaterial({ color:0xFF5800 , shininess:0.4, specular:0x009900 }), // orange
		new THREE.MeshPhongMaterial({ color:0xFFD500 , shininess:0.4, specular:0x009900 }), // yellow
		new THREE.MeshPhongMaterial({ color:0xFFFFFF , shininess:0.4, specular:0x009900 }), // white
		new THREE.MeshPhongMaterial({ color:0x000000 , shininess:0.4, specular:0x009900 }) // black
	];
	
	

}
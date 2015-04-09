var camera;
var renderer;
var scene;
var pivot;
var cameraControls;
var clock = new THREE.Clock();

var boxes = [];
var objects = [];
var boxesMoving = [];
var rotateParams = {
	axis:0,
	shouldRotate:false
};

function init() {
	var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;
    var aspectRatio = innerWidth / innerHeight;

    //Renderer:
	renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0x111111 );
    renderer.setSize( innerWidth, innerHeight );

    //Camera:
    camera = new THREE.PerspectiveCamera( 40, aspectRatio, 0.1, 10000 );
    camera.position.set( 800, 800, 800 );

    //CameraControls:
    cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
	
	var container = document.getElementById( "container" );
    container.appendChild( renderer.domElement );

    inputHandle();
}


function drawScene() {
	scene = new THREE.Scene();
	
    var ambientLight = new THREE.AmbientLight( 0xFFFFFF );
	scene.add( ambientLight );

	makeBoxes();
	
	// Make a pivot object at (0,0,0). 
	// When twisting the cube, add the cubes to this pivot and rotate the pivot.
	
	pivot = new THREE.Object3D();
	console.log(pivot.position);
	scene.add( pivot );

	// Draw boxes
	for (var i=0; i<27; i++) {
		scene.add( boxes[i] );
	}

	debugaxis(1000);
}

function animate() {
	window.requestAnimationFrame( animate );
	render();
}


function render() {
    cameraControls.update(  );	

    var doneRotating = false;

    if (rotateParams.shouldRotate) {
    	switch (rotateParams.axis) {
    		case -1:
    			pivot.rotation.x -= 0.1;
    			if (pivot.rotation.x <= -Math.PI/2.0) {
    				pivot.rotation.x = -Math.PI/2.0;
    				doneRotating = true;
    			}
    			break;
    		case -2:
    			pivot.rotation.y -= 0.1;
    			if (pivot.rotation.y <= -Math.PI/2.0) {
    				pivot.rotation.y = -Math.PI/2.0;
    				doneRotating = true;
    			}
    			break;
    		case -3:
    			pivot.rotation.z -= 0.1;
    			if (pivot.rotation.z <= -Math.PI/2.0) {
    				pivot.rotation.z = -Math.PI/2.0;
    				doneRotating = true;
    			}
    			break;
    		case 1:
    			pivot.rotation.x += 0.1;
    			if (pivot.rotation.x >= Math.PI/2.0) {
    				pivot.rotation.x = Math.PI/2.0;
    				doneRotating = true;
    			}
    			break;
    		case 2:
    			pivot.rotation.y += 0.08;
    			console.log(pivot.rotation.y);
    			if (pivot.rotation.y >= Math.PI/2.0) {
    				pivot.rotation.y = Math.PI/2.0;
    				console.log(pivot.rotation.y);
    				doneRotating = true;
    			}
    			break;
    		case 3:
    			pivot.rotation.z += 0.08;
    			if (pivot.rotation.z >= Math.PI/2.0) {
    				pivot.rotation.z = Math.PI/2.0;
    				doneRotating = true;
    			}
    			break;
    	}

    	renderer.render( scene, camera );
    	if (doneRotating) {
    		rotateParams.shouldRotate = false;
    		for (box in boxesMoving)
    			removeFromAnimate(boxes[boxesMoving[box]]);
    		boxesMoving = [];
    		pivot.rotation.x = 0;
    		pivot.rotation.y = 0;
    		pivot.rotation.z = 0;
    	}
    } else {
    	renderer.render( scene, camera );
    }
}

function inputHandle() {
	// document.getElementById( "clkFront" ).addEventListener( "click", function() { twistCube(0, 0) } );
	// document.getElementById( "cclkFront" ).addEventListener( "click", function() { twistCube(0, 1) } );
	// document.getElementById( "clkTop" ).addEventListener( "click", function() { twistCube(1, 0) } );
	// document.getElementById( "cclkTop" ).addEventListener( "click", function() { twistCube(1, 1) } );
	// document.getElementById( "clkRight" ).addEventListener( "click", function() { twistCube(2, 0) } );
	// document.getElementById( "cclkRight" ).addEventListener( "click", function() { twistCube(2, 1) } );
	window.addEventListener("keydown", keyPressHandler, false);
}

function makeBoxes() {
	var boxGeo = new THREE.BoxGeometry( 100, 100, 100 );
	var boxColors = setBoxColors();
	for (var i=0; i<27; i++) {
		var box = new THREE.Mesh( boxGeo, boxColors[i] );
		boxes.push( box );
	}

	//Front face
	boxes[0].position.set(0,105,105);
	boxes[1].position.set(-105,105,105);
	boxes[2].position.set(-105,0,105);
	boxes[3].position.set(-105,-105,105);
	boxes[4].position.set(0,-105, 105);
	boxes[5].position.set(105,-105,105);
	boxes[6].position.set(105,0,105);
	boxes[7].position.set(105,105,105);
	boxes[8].position.set(0,0,105);
	
	//Middle Face
	boxes[9].position.set(0,105,0);
	boxes[10].position.set(-105,105,0);
	boxes[11].position.set(-105,0,0);
	boxes[12].position.set(-105,-105,0);
	boxes[13].position.set(0,-105, 0);
	boxes[14].position.set(105,-105,0);
	boxes[15].position.set(105,0,0);
	boxes[16].position.set(105,105,0);
	boxes[17].position.set(0,0,0);
	
	//Back Face
	boxes[18].position.set(0,105,-105);
	boxes[19].position.set(-105,105,-105);
	boxes[20].position.set(-105,0,-105);
	boxes[21].position.set(-105,-105,-105);
	boxes[22].position.set(0,-105, -105);
	boxes[23].position.set(105,-105,-105);
	boxes[24].position.set(105,0,-105);
	boxes[25].position.set(105,105,-105);
	boxes[26].position.set(0,0,-105);
}

function setBoxColors() {
	var boxColors = [];

	var materials = [
		new THREE.MeshPhongMaterial({ color:0xB7E2EC , shininess:1.0, specular:0x009900 }), // red
		new THREE.MeshPhongMaterial({ color:0x779C72 , shininess:1.0, specular:0x009900 }), // green
		new THREE.MeshPhongMaterial({ color:0x4A6084 , shininess:1.0, specular:0x009900 }), // blue
		new THREE.MeshPhongMaterial({ color:0xF7D1D7 , shininess:1.0, specular:0x009900 }), // orange
		new THREE.MeshPhongMaterial({ color:0x7B4978 , shininess:1.0, specular:0x009900 }), // yellow
		new THREE.MeshPhongMaterial({ color:0xFFFFFF , shininess:1.0, specular:0x009900 }), // white
		new THREE.MeshPhongMaterial({ color:0x34363C , shininess:1.0, specular:0x009900 }) // black
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

var debugaxis = function(axisLength){
    //Shorten the vertex function
    function v(x,y,z){
            return new THREE.Vector3(x,y,z);
    }
   
    //Create axis (point1, point2, colour)
    function createAxis(p1, p2, color){
            var line, lineGeometry = new THREE.Geometry(),
            lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 1});
            lineGeometry.vertices.push(p1, p2);
            line = new THREE.Line(lineGeometry, lineMat);
            scene.add(line);
    }
   
    createAxis(v(0, 0, 0), v(axisLength, 0, 0), 0xFF0000);
    createAxis(v(0, 0, 0), v(0, axisLength, 0), 0x00FF00);
    createAxis(v(0, 0, 0), v(0, 0, axisLength), 0x0000FF);
};
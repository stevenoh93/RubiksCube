
function twistCube(face, dir) {
	switch (face) {
		case 0: // Front
			getObjWorldPos(boxes[0]);
			break;
		case 1: // Top
			break;
		case 2: // Right
			break; 
	}

}

function keyPressHandler(event) {
	// Rotation axis key:
	// positive x = 1, y = 2, z = 3
	// negative x = -1, y = -2, z = -3

	// Plane number key:
	// 1 -> plane near positive axis
	// 0 -> middle plane
	// -1 -> plane near negative axis

	if (event.shiftKey) { // Negative rotation
		switch ( event.keyCode ) {
			case 81: // Q
				selectBox(-1, -1);
				break;
			case 87: // W
				selectBox(-1, 0);
				break;
			case 69: // E
				selectBox(-1, 1);
				break;
			case 65: // A
				selectBox(-3, 1);
			 	break;
			case 83: // S
				selectBox(-3, 0);
				break;
			case 68: // D
				selectBox(-3, -1);
				break;
			case 90: // Z
				selectBox(-2, 1);
				break;
			case 88: // X
				selectBox(-2, 0);
				break;
			case 67: // C
				selectBox(-2, -1);
				break;
		}
	} else {
		switch ( event.keyCode ) {
			case 81: // q
				selectBox(1, -1);
				break;
			case 87: // w
				selectBox(1, 0);
				break;
			case 69: // e
				selectBox(1, 1);
				break;
			case 65: // a
				selectBox(3, 1);
			 	break;
			case 83: // s
				selectBox(3, 0);
				break;
			case 68: // d
				selectBox(3, -1);
				break;
			case 90: // z
				selectBox(2, 1);
				break;
			case 88: // x
				selectBox(2, 0);
				break;
			case 67: // c
				selectBox(2, -1);
				break;
		}
	}
}

function selectBox(axis, planeNum) {
	if (rotateParams.shouldRotate)
		return;
	// Find which boxes belong to the specified plane by looking at coordinates
	var curPos = new THREE.Vector3();
	boxesBeingSelected = true;
	for (box in boxes) {
		scene.updateMatrixWorld(true);
		curPos.setFromMatrixPosition(boxes[box].matrixWorld);
		switch (Math.abs(axis)) {
			case 1: //
				if (Math.abs(curPos.x - planeNum*105) <= 1) 
					addToAnimate(boxes[box], box);
				break;
			case 2:
				if (Math.abs(curPos.y - planeNum*105) <= 1)
					addToAnimate(boxes[box], box);
				break;
			case 3:
				if (Math.abs(curPos.z - planeNum*105) <= 1)
					addToAnimate(boxes[box], box);
				break;
		}
	}
	rotateParams.shouldRotate = true;
	rotateParams.axis = axis;
	rotHistory.push([axis, planeNum]);
}

function addToAnimate(box, idx) {
	var mwInverse = new THREE.Matrix4();
	box.applyMatrix( mwInverse.getInverse( pivot.matrixWorld ) ); // Bring box's transform in sync with the pivot's
	
	scene.remove( box );
	pivot.add( box );
	boxesMoving.push( idx );
}

function removeFromAnimate(box) {
	box.applyMatrix( pivot.matrixWorld ) // Undo transformation done to bring box in sync with pivot

	pivot.remove( box );
	scene.add( box );
}

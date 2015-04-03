
var canvas;
var gl;

var NumVertices  = 324;

var points = [];
var colors = [];
var boxes = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];
var endTheta = [0, 0, 0];

var thetaLoc;

var boxes = [];
var vertices = [];


window.onload = function init()
{
    // Add vertex coordinates to the vertices list
    // Each side of smaller cubes are .4 units. The entire cube is within -0.6 to 0.6 on all axis
    // Each vertex represents the (x,y,z) coordinate
    // 0 - red
    // 1 - yello
    // 2 - green
    // 3 - blue
    // 4 - magenta
    // 5 - cyan
    // 6 - black

    for (var z=6; z>=-6; z-=4) {
        for (var y=6; y>=-6; y-=4) {
            for (var x=-6; x<=6; x+=4) {
                vertices.push(vec3(x/10, y/10, z/10));
            }
        }
    }
            
    // Add boxes to the box list
    // Each box is represented by list of 6 faces
    // Each face is represented by 4 indexes to vertices list and color in integer (default 0)
    var rownum = 0;
    var si = 0;
    for(var box=0; box<27; box++) {
        if (box<9)  // front slice
            rownum = Math.floor(box/3);
        else if (box<18) // middle slice
            rownum = Math.floor(box/3) + 4; // Constant to match row number with vertex number
        else  // last slice
            rownum = Math.floor(box/3) + 8; // Constant to match row number with vertex number
    
        si = rownum + box;
        var faces = vertices2faces(si, si+1, si+4, si+5, si+16, si+17, si+20, si+21);   
        boxes.push(faces);
    }

    console.log(faces[4]);

    // Set up canvas

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCubes();

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta"); 
    
    //event listeners for buttons
    
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
        endTheta[axis] += 90;
        console.log(axis);
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
        endTheta[axis] += 90;
        console.log(axis);
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
        endTheta[axis] += 90;
        console.log(axis);
    };
        
    render();
}

/*
    Takes 8 vertices of a cube (order is important. more on readme)
    and returns a list of six faces with default color 6 (black)
*/
function vertices2faces(a, b, c, d, e, f, g, h) {
    var faces = [];
    faces.push([a, c, d, b, 6]);
    faces.push([b, d, h, f, 6]);
    faces.push([c, g, h, d, 6]);
    faces.push([f, e, a, b, 6]);
    faces.push([e, f, h, g, 6]);
    faces.push([a, e, g, c, 6]);
    return faces;
}

function colorCubes() {
    // sides A, E
    var faces = [];
    var curFace = [];
    for (var box=0; box<9; box++) {
        // side A
        setColor(boxes[box], 0);
        // side E
        setColor(boxes[box+18], 4);
    }
    for (var box=0; box<25; box+=3) {
        // side F
        setColor(boxes[box], 5);
        // side B
        setColor(boxes[box+2], 1);
    }
    for (var b1=0; b1<3; b1++) {
        for(var b2=0; b2<3; b2++) {
            var box = b1*9 + b2;
            // side D
            setColor(boxes[box], 3);
            // side C
            setColor(boxes[box+6], 2);
        }
    }
}

/*
    Sets color to each face. The face index is equal to the color index for convenience
*/
function setColor(faces, color) {
    var curFace = faces[color];
    curFace[4] = color;
    quad(curFace);
}

function colorCube(boxNum)
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

function quad(face) 
{
    var vertexColors = [
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 0.0, 0.0, 0.0, 1.0 ]  // black
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices
    
    //vertex color assigned by the index of the vertex
    
    var indices = [ face[0], face[1], face[2], face[0], face[2], face[3] ];
    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        colors.push( vertexColors[face[4]] );
        // console.log(vertices[indices[i]]);
    }
    // console.log(points);
    // console.log(colors);
    console.log(points.length);
    console.log(colors.length);
}
function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // theta[axis] += 2.0;
    for(var i=xAxis; i<=zAxis; i++) {
        if(theta[i] < endTheta[i]) {
            theta[i] += 2.0;
        }
    }
    gl.uniform3fv(thetaLoc, theta);

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    requestAnimFrame( render );
}


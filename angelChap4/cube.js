
var canvas;
var gl;

var NumVertices  = 36;

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

var vertices = [
    vec3( -0.6,  0.6,  0.6 ), vec3( -0.2,  0.6,  0.6 ), vec3(  0.2,  0.6,  0.6 ), vec3(  0.6,  0.6,  0.6 ),
    vec3( -0.6,  0.2,  0.6 ), vec3( -0.2,  0.2,  0.6 ), vec3(  0.2,  0.2,  0.6 ), vec3(  0.6,  0.2,  0.6 ),
    vec3( -0.6, -0.2,  0.6 ), vec3( -0.2, -0.2,  0.6 ), vec3(  0.2, -0.2,  0.6 ), vec3(  0.6, -0.2,  0.6 ),
    vec3( -0.6, -0.6,  0.6 ), vec3( -0.2, -0.6,  0.6 ), vec3(  0.2, -0.6,  0.6 ), vec3(  0.6, -0.6,  0.6 ),
    vec3( -0.6,  0.6,  0.2 ), vec3( -0.2,  0.6,  0.2 ), vec3(  0.2,  0.6,  0.2 ), vec3(  0.6,  0.6,  0.2 ),
    vec3( -0.6,  0.2,  0.2 ), vec3( -0.2,  0.2,  0.2 ), vec3(  0.2,  0.2,  0.2 ), vec3(  0.6,  0.2,  0.2 ),
    vec3( -0.6, -0.2,  0.2 ), vec3( -0.2, -0.2,  0.2 ), vec3(  0.2, -0.2,  0.2 ), vec3(  0.6, -0.2,  0.2 ),
    vec3( -0.6, -0.6,  0.2 ), vec3( -0.2, -0.6,  0.2 ), vec3(  0.2, -0.6,  0.2 ), vec3(  0.6, -0.6,  0.2 )
]

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // colorCubes();
    colorCube();

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

function colorCubes() {

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

function quad(a, b, c, d) 
{
    // var vertices = [
    //     vec3( -0.5, -0.5,  0.5 ),
    //     vec3( -0.5,  0.5,  0.5 ),
    //     vec3(  0.5,  0.5,  0.5 ),
    //     vec3(  0.5, -0.5,  0.5 ),
    //     vec3( -0.5, -0.5, -0.5 ),
    //     vec3( -0.5,  0.5, -0.5 ),
    //     vec3(  0.5,  0.5, -0.5 ),
    //     vec3(  0.5, -0.5, -0.5 )
    // ];

    // FIX THIS
    var b1 = [
        vertices[4],
        vertices[0],
        vertices[1],
        vertices[5],
        vertices[20],
        vertices[16],
        vertices[17],
        vertices[21]
    ];
    // var b2 = [
    //     vertices[1],
    //     vertices[2],
    //     vertices[18],
    //     vertices[17],
    //     vertices[5],
    //     vertices[6],
    //     vertices[22],
    //     vertices[21]
    // ];

    boxes.push(b1);
    // boxes.push(b2);

    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // white
        [ 0.0, 1.0, 1.0, 1.0 ]   // cyan
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices
    
    //vertex color assigned by the index of the vertex
    
    var indices = [ a, b, c, a, c, d ];
    for (var b=0; b<boxes.length; b++) {
        var curBox = boxes[b];
        for ( var i = 0; i < indices.length; ++i ) {
            points.push( curBox[indices[i]] );
            colors.push( vertexColors[a] );
        
            // for solid colored faces use 
            //colors.push(vertexColors[a]);
        
        }
    }
    
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


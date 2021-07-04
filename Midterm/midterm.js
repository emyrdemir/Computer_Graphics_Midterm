var canvas;
var gl;
var vPosition;
var program;

var letter1vertices, letter2vertices;
var buffer1, buffer2;
var posX = -0.1;
var posXLoc;
var posY = -0.2;
var posYLoc;
var scaleX = 1.0;
var scaleXLoc;
var scaleY = 1.0;
var scaleYLoc;
var redSlider = 1.0;
var greenSlider = 0.0;
var blueSlider = 0.0;

// TODO: define any global variables you need

window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Create geometry data
    letter1vertices = [vec2(0.0, 0.5),        //a
                        vec2(-0.2, 0.5),    //b
                        vec2(0.0, 0.4),   //d
                        vec2(-0.2, 0.5),    //b
                        vec2(-0.2, 0.4),   //c
                        vec2(0.0, 0.4),   //d
                        vec2(-0.3, 0.5),   //e
                        vec2(-0.2, 0.5),    //b
                        vec2(-0.2, -0.0),   //n
                        vec2(-0.3, 0.5),   //e
                        vec2(-0.3, 0.0),   //o
                        vec2(-0.2, -0.0),   //n
                        vec2(-0.2, 0.3),   //f
                        vec2(0.0, 0.3),   //g
                        vec2(0.0, 0.2),   //h
                        vec2(-0.2, 0.3),   //f
                        vec2(0.0, 0.2),   //h
                        vec2(-0.2, 0.2),   //i
                        vec2(-0.2, 0.1),   //k
                        vec2(0.0, 0.1),   //l
                        vec2(0.0, 0.0),   //m
                        vec2(-0.2, 0.1),   //k
                        vec2(-0.2, -0.0),   //n
                        vec2(0.0, 0.0)];  //m

    letter2vertices = [vec2(0.4, 0.5),      //a
                        vec2(0.3, 0.5),     //b
                        vec2(0.4, 0.4),     //d
                        vec2(0.3, 0.5),     //b
                        vec2(0.3, 0.4),     //c
                        vec2(0.4, 0.4),     //d
                        vec2(0.4, 0.5),     //a
                        vec2(0.4, 0.4),     //d
                        vec2(0.5, 0.4),     //e
                        vec2(0.4, 0.4),     //d
                        vec2(0.5, 0.4),     //e
                        vec2(0.5, 0.1),     //f
                        vec2(0.4, 0.4),     //d
                        vec2(0.5, 0.1),     //f
                        vec2(0.4, 0.1),     //g
                        vec2(0.5, 0.1),     //f
                        vec2(0.4, 0.1),     //g
                        vec2(0.4, 0.0),     //i
                        vec2(0.4, 0.1),     //g
                        vec2(0.3, 0.1),     //h
                        vec2(0.4, 0.0),     //i
                        vec2(0.3, 0.1),     //h
                        vec2(0.4, 0.0),     //i
                        vec2(0.3, 0.0),     //k
                        vec2(0.3, 0.0),     //k
                        vec2(0.2, 0.5),     //l
                        vec2(0.3, 0.5),     //b
                        vec2(0.3, 0.0),     //k
                        vec2(0.2, 0.5),     //l
                        vec2(0.2, 0.0)];    //m
    // TODO: create vertex coordinates for your initial letters instead of these vertices

    // Load the data into the GPU		
	buffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter1vertices), gl.STATIC_DRAW );  

    buffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter2vertices), gl.STATIC_DRAW );    
    
    posXLoc = gl.getUniformLocation( program, "posX" );
    posYLoc = gl.getUniformLocation( program, "posY" );
    scaleXLoc = gl.getUniformLocation( program, "scaleX" );
    scaleYLoc = gl.getUniformLocation( program, "scaleY" );

	document.getElementById("posX").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
        posX = event.target.value;
    };    
    document.getElementById("posY").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
        posY = event.target.value;
    };
    document.getElementById("scaleX").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
        scaleX = event.target.value;
    };
    document.getElementById("scaleY").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
        scaleY = event.target.value;
    };  
    document.getElementById("redSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        redSlider = event.target.value;
    };
    document.getElementById("greenSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        greenSlider = event.target.value;
    };
    document.getElementById("blueSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        blueSlider = event.target.value;
    };

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    // TODO: Send necessary uniform variables to shader and 
    // perform draw calls for drawing letters
    colorLoc = gl.getUniformLocation(program,"color");
    gl.uniform1f( posXLoc, posX );
    gl.uniform1f( posYLoc, posY );
    gl.uniform1f( scaleXLoc, scaleX );
    gl.uniform1f( scaleYLoc, scaleY );
    // bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    color = vec4(redSlider,greenSlider,blueSlider,1.0);
    gl.uniform4fv(colorLoc,color);
    // draw triangle
	gl.drawArrays(gl.TRIANGLES , 0, letter1vertices.length);
    
	// bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    color = vec4(1-redSlider,1-greenSlider,1-blueSlider,1.0);
    gl.uniform4fv(colorLoc,color);
    // draw rectangle
	gl.drawArrays(gl.TRIANGLES, 0, letter2vertices.length);



    window.requestAnimFrame(render);
}

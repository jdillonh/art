// in this sketch we're going to send a time variable to the shader
// https://p5js.org/reference/#/p5.Shader/setUniform

let capturing = true;
let captureLen = 314;

let uniformsShader;
var capturer;
var DOMCanvas;

function preload(){
    // load the shader
    uniformsShader = loadShader('vert.glsl', 'frag.glsl');
}

function setup() {
    frameRate(60)
    capturer = new CCapture( {
	framerate : 60,
	format : 'gif',
	workersPath : '',
	verbose : true,
    })

    // shaders require WEBGL mode to work
    var can = createCanvas(windowWidth, windowHeight, WEBGL);
    DOMCanvas = can.canvas;
    if( capturing ) {
	capturer.start()
    }
    noStroke();
}

function draw() {  
    // shader() sets the active shader with our shader
    shader(uniformsShader);

    // lets just send frameCount to the shader as a way to control animation over time
    uniformsShader.setUniform('time', frameCount);

    // rect gives us some geometry on the screen
    rect(0,0,width, height);

    if( capturing ) {
	if( frameCount < captureLen ) {
	    capturer.capture( DOMCanvas )
	}
	else if( frameCount === captureLen ) {
	    console.log( " all done " );
	    capturer.stop()
	    capturer.save()
	    noLoop()
	}
    }

}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

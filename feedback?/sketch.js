// in this sketch we're going to send a time variable to the shader
// https://p5js.org/reference/#/p5.Shader/setUniform

// a shader variable
let uniformsShader;

function preload(){
    // load the shader
    uniformsShader = loadShader('vert.glsl', 'frag.glsl');
}

var currIm;
var camIm;
var origin = [0,0];
let capture;

function setup() {
    // shaders require WEBGL mode to work
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    origin[0] = Math.random()*1000;
    origin[1] = Math.random()*1000;
    pnoise.seed(Math.random());

    capture = createCapture(VIDEO);
    capture.size(width, height);
    capture.hide();
}

function draw() {
    if( frameCount < 20 ) {
	background(0)
    }
    currIm = get(0, 0, width, height)

    uniformsShader.setUniform('cam', capture);
    uniformsShader.setUniform('origin', origin);
    uniformsShader.setUniform('currIm', currIm);
    uniformsShader.setUniform('time', frameCount);
    shader(uniformsShader);
    rect(0,0,width, height);

    origin[0] += pnoise.simplex2(origin[0]/1000, origin[1]/1000)-0.2;
    origin[1] += pnoise.simplex2(origin[0]/1000, origin[1]/1000)-0.2;
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

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
let g1;
let lastX;
let lastY;
//let capture;

let colors;
let movers = new Array(100);
function setup() {
    // shaders require WEBGL mode to work
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    origin[0] = Math.random()*1000;
    origin[1] = Math.random()*1000;
    pnoise.seed(Math.random());

    g1 = createGraphics(width, height);
    //capture = createCapture(VIDEO);
    //capture.size(width, height);
    //capture.hide();
    colors = [("#BB6E59"), ("#C59F74"), ("#7EB5B8")];
    for( let i = 0; i < movers.length; i++ ){
	movers[i] = [Math.random()*width, Math.random()*height, choose(colors)];
    }
}

function draw() {
    if( frameCount < 20 ) {
	background(0)
    }
    currIm = get(0, 0, width, height)
    if( Math.random() < 0.3) {
	g1.fill(colors[0])
    }
    else if (Math.random() < 0.6 ) {
	g1.fill(colors[1])
    }
    else  {
	g1.fill(colors[2])
    }

    g1.strokeWeight(10);
    g1.noStroke();
    g1.background(0, 10);
    for( let i = 0; i < movers.length; i++ ){
	//g1.fill(colors[movers[i][2]]);
	g1.fill(movers[i][2]);
	g1.ellipse(movers[i][0], movers[i][1], 60, 60);
	movers[i][0] += Math.random()*10 - 5
	movers[i][1] += Math.random()*10 - 5
    }
    //g1.ellipse(Math.random()*width, Math.random()*height, 60, 60);
    //g1.ellipse(mouseX - 150, mouseY - 75, 60, 60);
    //g1.line(lastX, lastY, mouseX, mouseY);
    //g1.ellipse(width/2, height/2, 60, 60);
    //g1.ellipse(mouseX, mouseY, 60, 60);
    //g1.background(0,5);

    uniformsShader.setUniform('g1', g1);
    uniformsShader.setUniform('origin', origin);
    uniformsShader.setUniform('currIm', currIm);
    uniformsShader.setUniform('time', frameCount);
    uniformsShader.setUniform('resx', width);
    uniformsShader.setUniform('resy', height);
    shader(uniformsShader);
    rect(0,0,width, height);

    origin[0] += pnoise.simplex2(origin[0]/1000, origin[1]/1000)-0.2;
    origin[1] += pnoise.simplex2(origin[0]/1000, origin[1]/1000)-0.2;

    lastX = mouseX;
    lastY = mouseY;
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

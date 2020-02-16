// in this sketch we're going to send a time variable to the shader
// https://p5js.org/reference/#/p5.Shader/setUniform

//this is perfect on Full screen
// just gotta figure out the loop

// TO get them in 1/2 offset just mult final time
// value by 1.5 right??

// a shader variable
let uniformsShader;
let allOrbs;
let can;
let numOrbs = 8;
let time = 0
let dtime = 0.005


var captureLen = 1270
var DOMCanvas
var capturing = false
var capturer

function preload(){
    // load the shader
    uniformsShader = loadShader('vert.glsl', 'frag.glsl');
}

function setup() {
    frameRate(30)
    // shaders require WEBGL mode to work
    can = createCanvas( 800, 450, WEBGL );

    DOMCanvas = can.canvas
    if( capturing ) {
	capturer = new CCapture( {
	    framerate : 30,
	    format : 'gif',
	    workersPath : '',
	    verbose : false,
	})
	capturer.start()
    }


    noStroke();

    allOrbs = [];
    for( let i = 0; i < numOrbs; i++ ) {
	allOrbs.push( new Orb( Math.random() * can.width,
			       Math.random() * can.height,
			       0.010 )) //23
    }

    shader( uniformsShader );
    uniformsShader.setUniform( 'width',
			       can.width )

    uniformsShader.setUniform( 'height',
			       can.height )

    noiseLib.seed( Math.random() )
}

function draw() {
    time += dtime

    if( time % PI  < 0.01 ) {
	print( "cycle!" + frameCount )
    }
    // shader() sets the active shader with our shader
    uniformsShader.setUniform( 'orbState',
			       arrayify( allOrbs ))

    uniformsShader.setUniform( 'time',
			       time )

    for( let i = 0; i < allOrbs.length; i++ ) {
	allOrbs[i].update()
    }
    // rect gives us some geometry on the screen
    rect( 0, 0, width, height);


    if( capturing ) {
	if( frameCount < captureLen ) {
	    capturer.capture( DOMCanvas )
	    print('captured', frameCount)
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
    throw "do not resize window"
    //resizeCanvas( windowWidth, windowHeight );
    uniformsShader.setUniform( 'width',
			       can.width )

    uniformsShader.setUniform( 'height',
			       can.height )
}


// meta balls
class Orb {
    constructor( x, y, r ) {
	this.x = x         //these are in screen space
	this.y = y
	this.r = r || 0.01 //must be 0 < r < 1
	this.t = 0

	this.dx = ( Math.random() * 2 - 1 ) * 3
	this.dy = ( Math.random() * 2 - 1 ) * 3

	this.xOff = Math.random() 
	this.yOff = Math.random() 
    }

    update() {
	this.perlinUpdate()
    }

    perlinUpdate() {
	let newPos = getNoisePos( this.xOff, this.yOff, time )
	this.x = (newPos.x * width/2) + (width/2)
	this.y = (newPos.y * height/2) + (height/2)
    }
    
    physicsUpdate() {
	//just thought I'd keep this around
	//for debugging or something 
	this.x += this.dx
	this.y += this.dy
	if( this.x < 0 ) {
	    this.dx *= -1
	}
	else if ( this.x > can.width ) {
	    this.dx *= -1
	}
	if( this.y < 0 ) {
	    this.dy *= -1
	}
	else if ( this.y > can.height ) {
	    this.dy *= -1
	}
    }

    show() {
	noFill()
	strokeWeight(1)
	ellipse( this.x, this.y, this.r, this.r )
	fill(255)
    }
}

function arrayify( listOfOrb ) {
    let arr = []
    for( let orb of listOfOrb ) {
	arr.push( orb.x / can.width )
	arr.push( orb.y / can.height )
	arr.push( orb.r )
    }
    return arr
}


function getNoisePos( xOff, yOff, t, variance ) {
    variance = variance || 1
    let x = noiseLib.simplex2( xOff + cos(t)*variance, xOff + sin(t)*variance )
    let y = noiseLib.simplex2( yOff + cos(t)*variance, yOff + sin(t)*variance )
    return { x:x, y:y }
}

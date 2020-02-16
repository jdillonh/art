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
let DOMCanvas;
let numOrbs = 28;

let capturer;
let captureLen = 60 * 2; // 5 sec
function preload(){

    // load the shader
    uniformsShader = loadShader('vert.glsl', 'frag.glsl');
}

function setup() {

    capturer = new CCapture( {
	framerate : 60,
	format : 'png',
	verbose : false,
    })
    capturer.start()

    // shaders require WEBGL mode to work
    can = createCanvas( windowWidth, windowHeight, WEBGL ) //this is apparently an abstraction 
    DOMCanvas = can.canvas //so un-abstract it 
    noStroke()

    allOrbs = []
    for( let i = 0; i < numOrbs; i++ ) {
	allOrbs.push( new Orb( Math.random() * can.width,
			       Math.random() * can.height,
			       0.0070 )) //23
    }

    shader( uniformsShader );
    uniformsShader.setUniform( 'width',
			       can.width )

    uniformsShader.setUniform( 'height',
			       can.height )
}

function draw() {
    // shader() sets the active shader with our shader
    
    uniformsShader.setUniform( 'orbState',
			       arrayify( allOrbs ));

    for( let i = 0; i < numOrbs/4; i++ ) {
	let orb1 = allOrbs[i]
	orb1.update1( i, numOrbs/4)

	let orb2 = allOrbs[i + numOrbs/4]
	orb2.update2( i, numOrbs/4)

	let orb3 = allOrbs[i + numOrbs * 2/4]
	orb3.update3( i, numOrbs/4)

	let orb4 = allOrbs[i + numOrbs * 3/4]
	orb4.update4( i, numOrbs/4)

    }

    // rect gives us some geometry on the screen
    rect( 0, 0, width, height);

    if( frameCount < captureLen ) {
	capturer.capture( DOMCanvas )
    }
    else if( frameCount === captureLen ) {
	console.log( " all done " );
	capturer.stop()
	capturer.save()
    }
}

function windowResized(){
    resizeCanvas( windowWidth, windowHeight );
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
    }

    update1( i, len ) {
	let orbitR = 200
	let wiggleR = 50
	let angleOff = i* Math.PI*2 / len
	this.x = Math.cos( angleOff + this.t )
	    * (orbitR + Math.cos( this.t* len ) * wiggleR )
	    + (can.width / 2)
	this.y = Math.sin( angleOff + this.t )
	    * (orbitR + Math.cos( this.t* len ) * wiggleR )
	    + (can.height / 2)
	this.t += 0.01
    }

    update2( i, len ) {
	let timeOff = 0 //Math.PI * 4 / len 
	let orbitR = -200
	let wiggleR = 50
	let angleOff = i* Math.PI*2 / len + Math.PI / len
	this.x = Math.cos( angleOff + this.t )
	    * (orbitR + Math.cos( this.t* len  ) * wiggleR )
	    + (can.width / 2)
	this.y = Math.sin( angleOff + this.t )
	    * (orbitR + Math.cos( this.t* len  ) * wiggleR )
	    + (can.height / 2)
	this.t -= 0.01
    }
    update4( i, len ) {
	let orbitR = 300
	let wiggleR = -50
	let angleOff = i* Math.PI*2 / len
	this.x = Math.cos( angleOff + this.t )
	    * (orbitR + Math.cos( this.t* len ) * wiggleR )
	    + (can.width / 2)
	this.y = Math.sin( angleOff + this.t )
	    * (orbitR + Math.cos( this.t * len ) * wiggleR )
	    + (can.height / 2)
	this.t += 0.01
    }

    update3( i, len ) {
	let timeOff = Math.PI * 4 / len 
	let orbitR = 300
	let wiggleR = 50
	let angleOff = i* Math.PI*2 / len
	this.x = Math.cos( angleOff + this.t )
	    * (orbitR + Math.cos( this.t* len ) * wiggleR )
	    + (can.width / 2)
	this.y = Math.sin( angleOff + this.t )
	    * (orbitR + Math.cos( this.t* len ) * wiggleR )
	    + (can.height / 2)
	this.t -= 0.01

    }

    pyshicsUpdate() {
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

// in this sketch we're going to send a time variable to the shader
// https://p5js.org/reference/#/p5.Shader/setUniform

//this is perfect on Full screen
// just gotta figure out the loop

// TO get them in 1/2 offset just mult final time
// value by 1.5 right??

// a shader variable
let uniformsShader
let allOrbs
let can
let numOrbs = 12
let dt = 0.03
let DOMCanvas;
let captureLen = 30 * 10
let capturing = true

function preload(){
    // load the shader
    uniformsShader = loadShader('vert.glsl', 'frag.glsl');
}

function setup() {

    capturer = new CCapture( {
	framerate : 30,
	format : 'webm',
	//workersPath : '',
	verbose : true,
    })
    frameRate(30)
    
    // shaders require WEBGL mode to work
    can = createCanvas( windowWidth/2, windowHeight/2, WEBGL );
    capturer.start()

    DOMCanvas = can.canvas

    noStroke();

    allOrbs = [];
    for( let i = 0; i < numOrbs; i++ ) {
	allOrbs.push( new Orb( Math.random() * can.width,
			       Math.random() * can.height,
			       .01 )) //23
    }

    shader( uniformsShader );
    uniformsShader.setUniform( 'width',
			       can.width )

    uniformsShader.setUniform( 'height',
			       can.height )
}

function draw() {
    // shader() sets the active shader with our shader
    //console.log(frameCount)
    uniformsShader.setUniform( 'orbState',
			       arrayify( allOrbs ));

    for( let i = 0; i < allOrbs.length; i++ ) {
	allOrbs[i].update(i)
    }

    // rect gives us some geometry on the screen
    rect( 0, 0, width, height);


    if( capturing ) {
	if( frameCount < captureLen ) {
	    capturer.capture( DOMCanvas )
	}
	else if( frameCount === captureLen ) {
	    console.log( " all done " );
	    capturer.stop()
	    capturer.save()
	}
    }
}

function windowResized(){
    return;
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
	this.currR = r
	this.t = 0

	this.dx = ( Math.random() * 2 - 1 ) * 3
	this.dy = ( Math.random() * 2 - 1 ) * 3
    }

    getDiamondCoord ( i, angleOff, radius ) {
	//this.t = this.t % TWO_PI
	let realT = this.t + angleOff
	realT %= TWO_PI
	if( realT < PI/2 ) {
	    this.y = can.height/2 +
		map(realT, 0, PI/2, -1, 0) * radius
	    this.x = can.width/2 +
		map(realT, 0, PI/2, 0, 1) * radius
	}
	else if( realT < PI ) {
	    this.x = can.width/2 +
		map(realT, PI/2, PI, 1, 0) * radius
	    this.y = can.height/2 +
		map(realT, PI/2, PI, 0, 1) * radius
	}
	else if( realT < 3*PI/2 ) {
	    this.y = can.height/2 +
		map(realT, PI, 3*PI/2, 1, 0) * radius
	    this.x = can.width/2 +
		map(realT, PI, 3*PI/2, 0, -1) * radius
	}
	else {
	    this.x = can.width/2 +
		map(realT, 3*PI/2, TWO_PI, -1, 0) * radius
	    this.y = can.height/2 +
		map(realT, 3*PI/2, TWO_PI, 0, -1) * radius
	}
    }
    getSquareCoord ( i, angleOff, radius ) {
	//this.t = this.t % TWO_PI
	let realT = this.t + angleOff
	realT %= TWO_PI
	if( realT < PI/2 ) {
	    this.y = can.height/2 + radius
	    this.x = can.width/2 +
		map(realT, 0, PI/2, -1, 1) * radius
	}
	else if( realT < PI ) {
	    this.x = can.width/2 + radius
	    this.y = can.height/2 +
		map(realT, PI/2, PI, 1, -1) * radius
	}
	else if( realT < 3*PI/2 ) {
	    this.y = can.height/2 - radius
	    this.x = can.width/2 +
		map(realT, PI, 3*PI/2, 1, -1) * radius
	}
	else {
	    this.x = can.width/2 - radius
	    this.y = can.height/2 +
		map(realT, 3*PI/2, TWO_PI, -1, 1) * radius
	}
    }

    update ( i ) {
	let angleOff = i * Math.PI*2 / allOrbs.length
	let radius =  ( 1 +Math.cos( this.t)  ) * 75
	this.currR = this.r + this.r * ( 1 + Math.cos( this.t + PI))
	this.t += dt
	this.getDiamondCoord(i, angleOff, radius)
    }

    updateCircle ( i ) {
	let angleOff = i * Math.PI*2 / allOrbs.length
	let radius = ( 1 + Math.cos( this.t ) ) * 150
	this.t += dt
	this.x = can.width / 2 +
	    Math.cos( this.t + angleOff ) * radius
	this.y = can.height / 2 +
	    Math.sin( this.t + angleOff ) * radius
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
	strokeWeight( 1 )
	ellipse( this.x, this.y, this.r, this.r )
	fill( 255 )
    }
}


function arrayify( listOfOrb ) {
    let arr = []
    for( let orb of listOfOrb ) {
	arr.push( orb.x / can.width )
	arr.push( orb.y / can.height )
	arr.push( orb.currR )
    }
    return arr
}

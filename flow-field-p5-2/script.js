/*
  wispies

  largely inspired by
  https://www.youtube.com/watch?v=BjoM9oKOAKY&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=6

  but optimized and added Color + new Flow Field functions

*/

var cfield = new cliffordField()
var gfield = new gravitationalFeild()
var pfield = new perlinFeild()
var sfield = new simplexFeild()
var mfield = new myField()

var scl = 20 
var closeness = 8 // 'zoom' smaller => further
var cols, rows
var can
var time = 0
var dt = 0.05
var thickness = 0.5
var orientationPeriod = 200
var drawPeriod = 1000
var numParts = 1000


let color1; 
let color2; 

var particles = new Array(numParts)

function setup () {
    can = createCanvas( window.innerWidth,
			window.innerHeight )
    pixelDensity(3)

    background('#F3E9C6')
    //color1 = color(13, 99, 255, 255)
    //color2 = color(13, 255, 148, 255)
    color1  = color('#BBBCFF')
    color2 = color('#BBBCFF')

    cols = Math.floor( can.width / scl )
    rows = Math.floor( can.height / scl )

    for( let i = 0; i < particles.length; i++ ) {
	particles[i] = new Particle()
    }
}

function draw () {
    if( frameCount > orientationPeriod + drawPeriod ) {
	noLoop()
	return
    }
    //background(255)

    //for( let x = 0; x < cols; x++ ) {
    //	for( let y = 0; y < rows; y++ ) {
    //	    //stroke(0)
    //	    //strokeWeight(1)
    //	    //drawGrid( x, y, time )
    //	}
    //}

    time += dt
    for( let part of particles ) {
	//always update w gfeild First, other wise
	// all strands will be the same color
	//part.update( gfield )
	part.update( mfield )
	//part.update( cfield )
	part.show()
    }
}

function keyPressed() {
    console.log(keyCode)
    if( keyCode === 13 ) {
	save()
    }
}

function drawGrid(x, y, time) {

    push()
    translate( x * scl, y * scl )
    rotate( field.get( x ,
		       y ,
		       time)
	    * TWO_PI )
    line( 0, 0, scl, 0 )
    pop()
}


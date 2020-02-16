/*
  wispies

  largely inspired by
  https://www.youtube.com/watch?v=BjoM9oKOAKY&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=6

  but optimized and added Color + new Flow Field functions

*/

var cfield = new cliffordField()
var gfield = new gravitationalFeild()
var pfield = new perlinFeild2()
var sfield = new simplexFeild()

var scl = 30 
var closeness = 5 // 'zoom' smaller => further
var cols, rows
var can
var time = 0
var dt = 0.05
var thickness = 100
var orientationPeriod = 0
var p2Scale = .1
var p2Directionality = 4;

var imgWidth = 600;
var imgHeight = 400;
var xStep = 10;
var yStep = 10;

let color1; 
let color2; 

var particles = new Array();
var img;
function preload() {
    img = loadImage('asset/meadow.jpg');
}

function setup () {
    can = createCanvas( window.innerWidth,
			window.innerHeight )
    
    //color1 = color(13, 99, 255, 255)
    //color2 = color(13, 255, 148, 255)
    color1 = color('black')
    color2 = color('red')

    background(255)
    cols = Math.floor( can.width / scl )
    rows = Math.floor( can.height / scl )

    let InitXOff = (can.width - imgWidth) / 2
    let InitYOff = (can.height - imgHeight) / 2
    for( let x = 0; x < imgWidth; x+=xStep ) {
	for( let y = 0; y < imgHeight; y+=yStep ) {
	    let col = img.get(
		Math.floor(img.width * x/imgWidth),
		Math.floor(img.height * y/imgHeight) )
	    //console.log( col );
	    particles.push( new Particle( InitXOff + x, InitYOff + y, col) )
	}
    }
}

function draw () {
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
	part.update( pfield )
	part.update( cfield )
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


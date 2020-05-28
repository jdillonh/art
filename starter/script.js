
var can;
var height = window.innerHeight,
    width  = window.innerWidth


var wigs = new Array(30);
var ctx;

function setup() {
    can = createCanvas( window.innerWidth,
			window.innerHeight )

    ctx = can.drawingContext

    for( let i = 0; i < wigs.length; i++ ) {
	let grad = ctx.createLinearGradient(0, 0, width, 0)
	grad.addColorStop( 0, getRndColor())
	grad.addColorStop( 1, getRndColor())
	wigs[i] = new Wiggle(0, 0, width, height, 800, getRndColor() )
    }
    
}

function draw() {
    noLoop()
    background( 0 )
    stroke(255)
    //longLine( points )
    //longLine( points2 )
    for( w of wigs ) {
	w.show()
    }
    //bigShape( points, points2 )

}


function longLine( arr ) {
    for( let i = 1; i < arr.length; i++ ) {
	line( arr[i-1].x, arr[i-1].y,
	      arr[i].x,   arr[i].y )
    }
}

function bigShape( arr1, arr2 ) {
    beginShape()
    for( let i = 0; i < arr1.length; i++ ) {
	vertex( arr1[i].x, arr1[i].y )
    }

    for( let i = arr2.length-1; i >= 0; i--) {
	vertex( arr2[i].x, arr2[i].y )
    }

    vertex( arr1[0].x, arr1[0].y ) 

    endShape()
}


class Wiggle {
    constructor( x, y, w, h, res, color ) {
	//initialize fields
	this.x = x
	this.y = y
	this.h = h
	this.w = w
	this.res = res
	this.color = color

	this.points1 = new Array( res ) // array of P5.Vector's
	this.points2 = new Array( res )

	this.init() // this allows us to reinitialize the Wiggles after instanstiantion :3
    }
    init() {

	//setup points
	noiseLib.seed( Math.random() )

	for( let i = 0; i < this.points1.length; i++ ) {
	    let prog = i / this.points1.length
	    let noiseVal = noiseLib.simplex2(prog + 100 , 0 )
	    //let noiseVal = noise( prog , 0 ) 
	    this.points1[i] = new p5.Vector( lerp( 0, width, prog ),
					     this.h/4 +
					     noiseVal * this.h/4 +
					     this.h/4 *
					     Math.sin( prog*TWO_PI*noiseVal))
	}
	let off = 2000 
	noiseLib.seed(Math.random())
	noiseSeed(Math.random()*100)
	for( let i = 0; i < this.points2.length; i++ ) {
	    let prog = i / this.points2.length
	    let noiseVal = noiseLib.simplex2(prog + 100 , off )
	    //let noiseVal = noise( prog ,  off ) 
	    this.points2[i] = new p5.Vector( lerp( 0, width, prog ),
					     this.h*3/4 +
					     noiseVal * this.h/4 +
					     this.h/4 *
					     Math.sin( prog*TWO_PI*noiseVal))
	}

    }

    show() {
	//connect the dots
	noStroke()
	//strokeWeight(0)
	//fill( this.color )
	ctx.fillStyle = this.color
	bigShape( this.points1, this.points2 )
    }

}

function keyPressed() {
    print(keyCode)
    if (keyCode === 32 ) {
	for( w of wigs ) {
	    w.init()
	}
	draw()
    }
}


//I didn't feel like typing this out...
//https://stackoverflow.com/questions/22237497/draw-a-circle-filled-with-random-color-sqares-on-canvas
function getRndColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0,
        a = Math.random();
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

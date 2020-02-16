
var can;
var height = window.innerHeight,
    width  = window.innerWidth


var wigs = new Array(150);
var ctx;
var t = 0
var dt = 0.1
function setup() {
    can = createCanvas( window.innerWidth,
			window.innerHeight )

    ctx = can.drawingContext
    print(can.width, can.height)
    frameRate(10)
    for( let i = 0; i < wigs.length; i++ ) {
	let newH = lerp( -100, height+100, i / wigs.length )
	wigs[i] = new Wiggle(0, 0, width, newH, 800, 'black' )
    }

    for( let i = 0; i < wigs.length; i++ ) {
	let newH = lerp( 0, height, i / wigs.length )
	wigs[i].init(newH) 
    }
    
}

function draw() {
    noLoop()
    background( 255 )
    //longLine( points )
    //longLine( points2 )
    for( w of wigs ) {
	w.show()
    }
    //bigShape( points, points2 )

}



class Wiggle {
    constructor( x, y, w, h, res, color ) {
	//initialize fields
	this.x = x
	this.y = y
	this.h = h
	this.w = w
	this.amp = 300
	this.noiseAmp = 4
	this.res = res
	this.color = color

	this.points1 = new Array( res ) // array of P5.Vector's

    }
    init( noiseY ) {

	//setup points
	noiseLib.seed( Math.random() )

	for( let i = 0; i < this.points1.length; i++ ) {
	    let prog = i / this.points1.length
	    //let noiseVal = noiseLib.simplex2(prog + 100 , 0 )
	    let noiseVal = noise( prog, noiseY/1000 )*this.noiseAmp - this.noiseAmp/2
	    //let noiseVal = noiseLib.simplex2( prog, noiseY/1000 )/10 // - this.noiseAmp/2
	    this.points1[i] = new p5.Vector( lerp( 0, width, prog ),
	    				     this.h +
	    				     this.points1.length/200*sin(noiseVal * this.amp ))

	    //this.points1[i] = new p5.Vector( lerp( 0, width, prog ),
	    //				     this.h +
	    //				     noiseVal * this.amp )
	}

    }

    show() {
	//connect the dots
	stroke(this.color)
	strokeWeight(2)
	fill( this.color )
	bigCurve( this.points1 )
    }

}

function keyPressed() {
    print(keyCode)
    if (keyCode === 32 ) {
	noiseLib.seed(Math.random() )
	for( let i = 0; i < wigs.length; i++ ) {
	    let newH = lerp( 0, height, i / wigs.length )
	    wigs[i].init(newH) 
	}

	draw()
    }
    else if (keyCode == 13 ) {
	save()
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

function bigCurve( arr ) {

    //fill(100)
    noFill()
    beginShape()
    for( let i = 1; i < arr.length; i++ ) {
	curveVertex( arr[i-1].x, arr[i-1].y,
		     arr[i].x,   arr[i].y )
    }
    endShape()
}

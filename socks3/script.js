
var can;
var height = window.innerHeight,
    width  = window.innerWidth
var socksPerRow = 20 //calc this based on window width
var numRows = 40 
var allSocks = []
var t 
var dt = 0.015
var mode = 1
var t = Math.PI
// DO it like this,
//  bright, brighter, brightest
var colors = [ "red", "orange", "yellow",
	       "green", "purple", "blue",
	       "pink", "lightgreen", "lightyellow",
	       "darkred", "darkorange", "darkyellow" ]

colors = [ "red", "orange", "yellow",
	   "green", "purple", "blue",
	   "orange", "yellow", "red",
	   "purple", "blue", "green" ]

var captureLen = 214
var DOMCanvas
var capturing = false

function setup() {
    capturer = new CCapture( {
	framerate : 30,
	format : 'gif',
	workersPath : '',
	verbose : true,
    })
    frameRate(30)
    can = createCanvas( 900,
			600 )

    DOMCanvas = can.canvas
    strokeJoin(ROUND)

    for( let row = 0; row < numRows; row+=1 ) {
	let currRow = []
	for( let i = 0; i < socksPerRow; i++ ) {
	    let w = 320/2
	    let hTop = 160/2
	    let hMid = 0
	    let currX= i * 3/2 * w + (row % 2) * 3/4 * w - 500
	    let yOff =  (3/2 * hTop + hMid)/2
	    let currY= yOff * row  - 130
	    //console.log(row)
	    if( row%2 ) {
		var cols = {
		    right: colors[0 + 6 * (i%2)],
		    left:  colors[1 + 6 * (i%2)],
		    top:   colors[2 + 6 * (i%2)],
		}
	    }
	    else {
		cols = {
		    right: colors[3 + 6 * (i%2)],
		    left:  colors[4 + 6 * (i%2)],
		    top:   colors[5 + 6 * (i%2)],
		}
		//color2
	    }
	    currRow[i] = new Sock( currX, currY, w, hTop, hMid,
				   cols.left, cols.right, cols.top )
	}
	allSocks.push( currRow )
    }

    if( capturing )
	capturer.start()

}

function draw() {
    t += dt*2
    t %= 2*PI

    //print(Math.pow( sin(t ), 1/3))

    background(255)
    fill(0)
    //noStroke()
    strokeWeight(8)
    for( let row = 0; row < allSocks.length; row++ ) {
	for( sock of allSocks[row] ) {
	    sock.show()
	    sock.update()
	}
    }


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


class Sock {
    constructor(x, y, w, hTop, hMid, leftCol, rightCol, topCol) {
	this.x = x //top LH corner
	this.y = y
	this.leftCol  = color(leftCol || 100)
	this.rightCol = color(rightCol || "#EBE18C")
	this.topCol   = color(topCol || "#aab")
	this.topCol2  = this.topCol
	this.w = w //|| 80
	this.hTop = hTop //|| 50
	this.hMid = hMid //|| 20
    }

    show() {
	push()
	translate(this.x, this.y)
	//draw Top
	fill(this.topCol)
	beginShape()
	vertex( 0,0)
	vertex( this.w/4, -this.hTop/4 )
	vertex( this.w/2, 0 )
	vertex( this.w*3/4, -this.hTop/4 )
	vertex(this.w, 0)
	vertex(this.w/2, this.hTop/2 )
	vertex( 0,0)
	endShape()
	//draw Left
	fill(this.leftCol)
	beginShape()
	vertex(0, 0)
	vertex(this.w/2, this.hTop/2 )
	vertex(this.w/2, this.hTop*3/2 + this.hMid )
	vertex(0, this.hMid + this.hTop )
	vertex(0, 0)
	endShape()

	fill(this.rightCol)
	beginShape()
	vertex(this.w, 0)
	vertex(this.w, this.hTop + this.hMid)
	vertex(this.w/2, this.hTop*3/2 + this.hMid )
	vertex(this.w/2, this.hTop/2 )
	vertex(this.w, 0)
	endShape()

	pop()
    }

    update() {
	//this.hTop = 160 * (2.0 + sin(t ))
	//this.topCol = lerpColor( this.rightCol, this.leftCol, this.hTop  )
	this.w = 320/2 * (2 + cos(t))
    }
}

function keyPressed() {
    if( keyCode  === 32 ) {
	save()
    }
}

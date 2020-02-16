
var can;
var height = window.innerHeight,
    width  = window.innerWidth
var socksPerRow = 20 //calc this based on window width
var numRows = 40 
var allSocks = []
var t 
var dt = 0.02
var mode = 1
var t = 0

//var colors = [ "blue", "red", "#EEE",
//	       "#6592FF", "#FF423E", "white" ]
var colors = [ "beige", "white", "grey",
	       "white", "beige", "grey" ];

var captureLen = 160
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
	    let w = 320
	    let hTop = 160
	    let hMid = 0
	    let currX= i * 3/2 * w + (row % 2) * 3/4 * w - 100
	    let yOff =  (3/2 * hTop + hMid)/2
	    let currY= yOff * row  - 130
	    //console.log(row)
	    if( row%2 ) {
		var cols = {
		    right: colors[0],
		    left:  colors[1],
		    top:   colors[2],
		}
	    }
	    else {
		cols = {
		    right: colors[3],
		    left:  colors[4],
		    top:   colors[5],
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
    print(frameCount)
    t += dt*2
    t %= 2*PI
    background(255)
    fill(0)
    //noStroke()
    strokeWeight(3)
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
	this.leftCol = color(leftCol || 100)
	this.rightCol = color(rightCol || "#EBE18C")
	this.topCol = color(topCol || "#aab")
	this.topCol2 = this.topCol
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
	this.hTop = 160 * (2.0 + sin(t ))
	//this.topCol = lerpColor( this.topCol2, this.leftCol, this.hTop / 160  )
	//this.w = 320 * (2 + sin(t ))
    }
}

function keyPressed() {
    if( keyCode  === 32 ) {
	save()
    }
}

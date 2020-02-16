
var can;
var t = 0;
var dt = 0.018;
var numLines = 21

var insideCol1
var insideCol2
var bgCol
var lineCol

var capturer
var DOMCanvas
var recordLen = 390
var recording = true

function setup() {
    can = createCanvas( 900,
			900 )
    DOMCanvas = can.canvas
    frameRate(30)

    insideCol1 = color('#8C5674')
    insideCol2 = color('#D99CA7')
    bgCol = color('#BFA59F')
    lineCol = color('#1F7373')
    stroke(lineCol)
    strokeWeight( 4 )
    strokeJoin(ROUND);


    capturer = new CCapture( {
	framerate : 30,
	format : 'gif',
	workersPath : '',
	verbose : true,
    })
    capturer.start()
}

function draw() {
    background(bgCol)
    t += dt
    let rad = 20 + 100 * (1  )
    let centerX = width/2
    let centerY = height/2
    beginShape(TRIANGLES)
    for( let i = 0; i < numLines; i++ ) {
	let angle = t + i * TWO_PI*sin(t) / numLines
	rad = rad + i 
	fill( lerpColor( insideCol1, insideCol2, ( 1 + sin(t)) / 2 ))
	vertex( centerX, centerY )
	vertex( centerX + cos(angle) * rad, centerY + sin(angle) * rad )
    }
    endShape()
    //adding this
    rad = 20 + 100 * (1  )
    for( let i = 0; i < numLines; i++ ) {
	let angle = t * 2 + TWO_PI / numLines + i * TWO_PI*sin(t) / numLines
	angle *= -1
	rad = rad + i 
	fill( lerpColor( insideCol1, insideCol2, ( 1 + sin(t)) / 2 ))
	vertex( centerX, centerY )
	vertex( centerX + cos(angle) * rad, centerY + sin(angle) * rad )
    }
    endShape()

    if( recording ) {
	if( frameCount < recordLen ) {
	    capturer.capture( DOMCanvas )
	}
	else if( frameCount === recordLen ) {
	    console.log( " all done " );
	    capturer.stop()
	    capturer.save()
	}
    }
}

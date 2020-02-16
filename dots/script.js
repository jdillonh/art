
var can
var height = window.innerHeight,
    width  = window.innerWidth
var ctx

function setup() {
    can = createCanvas( window.innerWidth,
			window.innerHeight )
    ctx = can.drawingContext
    noStroke()

}

function draw() {
    background( 0 )
    noLoop()
    var insideWidth = 400
    var step = 100
    var numPerRow = insideWidth / step
    let xOff = (width - insideWidth) / 2
    let yOff = (height - insideWidth) / 2
    for( let i = 0; i < numPerRow; i++ ) {
	for( let j = 0; j < numPerRow; j++ ) {
	    let x = i * step + xOff
	    let y = j * step + yOff
	    //let x2 = xOff - 100
	    //let y2 = yOff - 100
	    let x2 = cos( millis()/1000 ) * (insideWidth*1.2) + can.width/2
	    let y2 = sin( millis()/1000 ) * (insideWidth*1.2) + can.height/2
	    //fill('black')
	    ctx.fillStyle = 'black'
	    ellipse(x, y, 100, 100)
	    drawGradient( x, y,
	    		  x2, y2,
	    		  100)
	}
    }
}

// requier global ctx
function drawGradient(x, y, x2, y2, radius, col1, col2) {

    var grad = ctx.createRadialGradient(x, y, radius,
					x2, y2, 0)
    grad.addColorStop(0, "black")
    grad.addColorStop(1, "white")//"#FFF0")
    ctx.fillStyle = grad
    ellipse( x, y, radius, radius )

    //for (let r = radius; r > 0; r-=1) {
    //	noFill()
    //	stroke(lerpColor( col1, col2, r/radius ))
    //	//fill(color('red'))
    //	ellipse(x, y, r, r)
    //}
}

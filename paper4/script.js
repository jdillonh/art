// constants
var sideMargin = -50
var topMargin = -50
var togetherness = 4
var density = 40
var swath = 600 * 0.2 //(width) * 0.3

var moverRad = 200

// other globals
var can
var stack
var t
var dt

var DOMCanvas

var colors = [
    "#804242",
    "#FFD1D1",
    "#FF8585",
    "#806969",
    "#CC6A6A",
];

function setup() {

    t = 0
    dt = 0.02
    can = createCanvas( 600,
			600 )

    DOMCanvas = can.canvas
    //blendMode(SOFT_LIGHT)
    stack = new Array( 160)

    strokeJoin( BEVEL )

    for( let i = 0; i < stack.length; i++ ) {
	let h = map( i / stack.length, 0, 1, topMargin, height - topMargin )
	stack[i] = new Paper( width/2, h + density, h, colors[i%colors.length])
    }

}

function draw() {
    background(200)
    stroke(0)
    strokeWeight(1)
    fill(255)

    //console.log(t)

    t += dt

    for( let i = stack.length-1; i >= 0; i-- ) {
	let p = stack[i]
	p.draw()
	p.update(i, t)
    }

    fill(255,255,255,100)
    circle(mouseX, mouseY, moverRad)


}


class Paper {
    constructor( midx, midy, height, _color ) {
	this.color = _color
	this.originalMid = new p5.Vector( midx, midy )
	this.drawMid = this.originalMid.copy()
	this.left = new p5.Vector( sideMargin, height )
	this.right = new p5.Vector( width - sideMargin, height )
    }

    update(i, t) {
	let param = i/togetherness + t
	this.drawMid.x = this.originalMid.x + (sin(param) * swath * sin(i/20 - t))
	let dist =   Math.sqrt( Math.pow(mouseX - this.drawMid.x, 2) +
				Math.pow(mouseY - this.drawMid.y,2))
	if (dist < 200) {
	    this.drawMid.x += dist;
	}
	//this.drawMid.x = this.originalMid.x + sin(param + sin(param)/2) * swath
	//this.drawMid.x = this.originalMid.x + sin(sin(param) + 2.5*cos(param)) * swath
	//this.drawMid.x = this.originalMid.x + (sin(param/2) + cos(param*2) * 1.1)/2.5 * swath

    }

    draw() {
	let c = this.color ? this.color : 'black'
	fill( this.color )
	noStroke( c )
	beginShape()
	vertex( this.left.x, this.left.y)
	vertex( this.drawMid.x, this.drawMid.y)
	vertex( this.right.x, this.right.y)
	vertex( this.left.x, this.left.y)
	endShape()
    }
}

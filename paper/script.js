// constants
var sideMargin = 30
var topMargin = 30
var togetherness = 4
var density = 40
var swath = 600 * 0.3 //(width) * 0.3

// other globals
var can
var stack
var t
var dt

function setup() {
    t = 0
    dt = 0.03
    can = createCanvas( 600,
			600 )

    stack = new Array(20)

    strokeJoin( BEVEL )

    for( let i = 0; i < stack.length; i++ ) {
	let h = map( i / stack.length, 0, 1, topMargin, height - topMargin )
	stack[i] = new Paper( width/2, h + density, h )
    }

}

function draw() {
    background(200)
    stroke(0)
    strokeWeight(1)
    fill(255)

    t += dt

    for( let i = stack.length-1; i >= 0; i-- ) {
	let p = stack[i]
	p.draw()
	p.update(i, t)
    }

}


class Paper {
    constructor( midx, midy, height ) {
	this.color = 0
	this.originalMid = new p5.Vector( midx, midy )
	this.drawMid = this.originalMid.copy()
	this.left = new p5.Vector( sideMargin, height )
	this.right = new p5.Vector( width - sideMargin, height )
    }

    update(i, t) {
	let param = i/togetherness + t
	//this.drawMid.x = this.originalMid.x + sin(param) * width * 0.3
	//this.drawMid.x = this.originalMid.x + sin(param + sin(param)/2) * swath
	this.drawMid.x = this.originalMid.x + sin(sin(param) + 2.5*cos(param)) * swath
	//this.drawMid.x = this.originalMid.x + (sin(param/2) + cos(param*2) * 1.1)/2.5 * swath

    }

    draw() {
	let c = this.color ? this.color : 'black'
	fill( 100 )
	noStroke( c )
	beginShape()
	vertex( this.left.x, this.left.y)
	vertex( this.drawMid.x, this.drawMid.y)
	vertex( this.right.x, this.right.y)
	vertex( this.left.x, this.left.y)
	endShape()
    }
}

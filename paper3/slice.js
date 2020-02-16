

class Slice {

    constructor( y ) {
	this.y = y
    }

    draw( center ) {
	beginShape(LINES)
	vertex( 0, this.y)
	vertex( width, this.y)
	endShape()
    }

}



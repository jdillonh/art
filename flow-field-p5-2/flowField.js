/*
  ik this class thing is a little overboard
  but I want some practice and it makes the 
  interface nice
*/


class flowFeild {

    constructor () {

    }

    get ( x, y, z ) {
	this.generator( x, y )
    }

}

class perlinFeild extends flowFeild {
    constructor ( ) {
	super()
	this.get = function ( x, y, z ) {
	    return noise( x , y , z ) 
	}
    }
}

class simplexFeild extends flowFeild {
    constructor() {
	super()
	noiseLib.seed( Math.random() )
	this.get = function ( x, y, z ) {
	    return noiseLib.simplex2( x, y);
	}
    }
}

class gravitationalFeild extends flowFeild {
    constructor ( ) {
	super()
	this.get = function ( x, y, z ) {
	    return 0.25 
	}
    }
}

/*
 * based on a clifford attractor but not quite
 * http://paulbourke.net/fractals/clifford/
 */
class cliffordField extends flowFeild {
    constructor () {
	super()
	this.get = function ( x, y, z ) {
	    let a = 1.4,
		b = 1.6,
		c = 1.6,
		d = 0.7 * z/10
	    return Math.sin( b * x ) + d * Math.cos( b * y )
	}
    }
}

class myField extends flowFeild {
    constructor() {
	super()
	this.get = function ( x, y, z ) {
	    //return Math.sin(10*x) + 2*Math.cos(y)
	    //y -= 20
	    return (y + 1) - (1.4 * Math.pow(x,2) )
	}
    }
}

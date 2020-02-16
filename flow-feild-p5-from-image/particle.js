// ik I spelled field wrong and i am SO sorry

class Particle {
    constructor ( x, y, color ) {
	this.pos = createVector( x || random( width ), y || random( height ) )
	this.lastPos = createVector( this.pos.x, this.pos.y ) 
	this.lastFieldVal = 0
	this.vel = createVector(0, 0)
	this.acc = createVector(0, 0)
	this.maxSpeed = 4
	this.wrapped = false
	this.framesAlive = 0
	this.color = color;
    }

    update ( field ) {
	this.framesAlive++ 

	let fieldVal = field.get( floor( this.pos.x ) / scl / closeness,
				  floor( this.pos.y ) /scl / closeness,
				  time )

	let force = p5.Vector.fromAngle( fieldVal * TWO_PI )
	this.lastFieldVal = fieldVal
	//force.setMag( 1 )

	this.applyForce( force )
	
	
	
	this.vel.add( this.acc )
	this.pos.add( this.vel )
	this.acc.mult( 0 )

	/*
	  if( this.pos.x > width ) {
	  this.pos.x = 0
	  this.wrapped = true
	  }
	  else if( this.pos.x < 0 ) {
	  this.pos.x = width
	  this.wrapped = true
	  }
	  if( this.pos.y > height ) {
	  this.pos.y = 0
	  this.wrapped = true
	  }
	  else if( this.pos.y < 0 ) {
	  this.pos.y = height
	  this.wrapped = true
	  }
	*/
	

	this.vel.limit( this.maxSpeed )
    }

    applyForce ( force ) {
	this.acc.add( force )
    }

    show () {
	if (this.framesAlive < orientationPeriod ) {
	    // this gives the particles a chance to
	    // "get into the field"
	    // before they are drawn
	    // leads to less scragly lines at beginning
	    this.lastPos.x = this.pos.x
	    this.lastPos.y = this.pos.y
	    return;
	}
	stroke(this.color)
	strokeWeight( thickness )
	fill(0)
	//circle( this.pos.x, this.pos.y, 0.01 )
	//point( this.pos.x, this.pos.y )
	if ( this.wrapped ) {
	    this.wrapped = false
	}
	else {
	    line( this.pos.x, this.pos.y, this.lastPos.x, this.lastPos.y )
	}

	this.lastPos.x = this.pos.x
	this.lastPos.y = this.pos.y
    }
    
}


// this grid will be a TREE
// Divide screen into 2... then recur on some random chance
var myScreenTree
var colors

function setup () {
    var can = createCanvas( window.innerWidth*0.8, window.innerHeight*0.8 )
    myScreenTree = new screenTree(null, 3.0)
    myScreenTree.makeBabies()
    myScreenTree.setSizes( 0, 0, can.width, can.height )
    noStroke();

    colors = [
	color('#D6A37E'), color('#FFC8A1'), color('#FFB987'),
	color('#3BA8B3'), color('#87F5FF')
    ]
}


function draw () {
    myScreenTree.showBabies()
    noLoop()
}

function keyPressed () {
    // quick lil save
    if ( keyCode == ENTER ) {
	save();
    }

    if ( keyCode == BACKSPACE ) {
	setup()
	draw()
    }
}


class screenTree {
    constructor (parent, chanceToReproduce) {
	this.parent = parent
	this.child1 = null // set in makeBabies
	this.child2 = null
	this.x = null // set in setSizes
	this.y = null
	this.w = null
	this.h = null
	this.chanceToReproduce = chanceToReproduce
	this.parent = parent
    }

    makeBabies () {
	if( Math.random() < this.chanceToReproduce ) {
	    this.child1 = new screenTree( this, this.chanceToReproduce/2 )
	    this.child2 = new screenTree( this, this.chanceToReproduce/2 )
	    this.child1.makeBabies()
	    this.child2.makeBabies()
	}
    }

    setSizes ( totalX, totalY, totalW, totalH ) {
	// THIS is where the tree magic happens
	// totalParams are the space we need to divide amongst
	// our babies
	if( this.child1 !== null ) {
	    let shouldDivideHorizontal = Math.random() > 0.5
	    if( shouldDivideHorizontal ){
		this.child1.setSizes( totalX, totalY, totalW/2, totalH )
		this.child2.setSizes( totalX+totalW/2, totalY, totalW/2, totalH )
	    }
	    else { // divide Vertically
		this.child1.setSizes( totalX, totalY, totalW, totalH/2 )
		this.child2.setSizes( totalX, totalY+totalH/2, totalW, totalH/2 )
	    }
	}
	else {
	    // no tiene hijos
	    // take it all for urself
	    this.x = totalX
	    this.y = totalY
	    this.w = totalW
	    this.h = totalH
	}
    }
    
    show () {
	// draw some shiiiiiiit
	//fill( colors[floor(random(colors.length))])
	fill( Math.random()*255 ) 
	rect( this.x, this.y, this.w, this.h )
	console.log( `drawing at ${this.x}, ${this.y}, ${this.w}, ${this.h}`);
    }

    showBabies () {
	// call this on the trunk
	if( this.child1 === null ) {
	    this.show()
	}
	else {
	    this.child1.showBabies()
	    this.child2.showBabies()
	}
	
    }

    printAll() {
	if( this.child1 === null ) {
	    console.log(`I am a leaf at ${this.x}, ${this.y}, ${this.w}, ${this.h}`)
	}
	else {
	    console.log("I am a branch and here are my babies:")
	    this.child1.printAll()
	    this.child2.printAll()
	}
    }
}

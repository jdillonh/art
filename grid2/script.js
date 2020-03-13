
var can
var height = window.innerHeight,
    width  = window.innerWidth

var numSquares = 10 //sqrt of total cells
var colors

var img

function preload() {

    img = loadImage( 'colorSource2.jpg' )
}

function setup() {
    can = createCanvas( 600,
			600 )

    colors = [
	color('#FFB180'),
	color('#E89174'),
	color('#FF988C'),
	color('#E87486'),
	color('#FF80D3'),
    ]

    img.loadPixels()
}

function draw() {
    noLoop()
    noStroke()
    background(255)
    var scale = can.width / numSquares //assume square canvas
    var innerScale = scale * 0.4
    fill( colors[floor(random(colors.length))])
    for( let i = 0; i < numSquares; i++ ) {
	for( let j = 0; j < numSquares; j++ ) {
	    push()
	    translate( i * scale, j * scale )
	    //rect( 0, 0, scale, scale)
	    let type = floor(Math.random()*tileTypes.length)
	    tileTypes[type](scale, innerScale)
	    pop()

	}
    }
    loadPixels()
    for( let i = 0; i < can.width; i++ ) {
	for( let j = 0; j < can.height; j++ ) {
	    newC = img.get( floor(i/3),
			    floor(j/3))
	    oldC = get(i, j)
	    if( red(oldC) == 255 &&
		blue(oldC) == 255 ) {
	    }
	    else {
		//set( i, j, newC )
	    }
	}
    }
    updatePixels()
}

var tileTypes = [
    //these becme anonymous,
    //but this is a nice way to label them
    function squares( scale, innerScale ) {
	rect(0, 0, innerScale, innerScale)
	rect(scale - innerScale, 0, innerScale, innerScale)
	rect(0, scale - innerScale, innerScale, innerScale)
	rect(scale - innerScale, scale - innerScale, innerScale, innerScale)
    },
    function circles( scale, innerScale ) {
	innerScale *= 2
	arc(0, 0, innerScale, innerScale, 0, HALF_PI)
	arc(0, scale, innerScale, innerScale, 3*HALF_PI, TWO_PI)
	arc(scale, 0, innerScale, innerScale, HALF_PI, PI)
	arc(scale, scale, innerScale, innerScale, PI, 3*HALF_PI)
    },
    function triangles( scale, innerScale ) {
	triangle(0, 0,
		 innerScale, 0,
		 0, innerScale )
	triangle(scale - innerScale, 0,
		 scale, 0,
		 scale, innerScale )
	triangle(0, scale - innerScale,
		 0, scale,
		 innerScale, scale )
	triangle(scale, scale,
		 scale, scale - innerScale,
		 scale - innerScale, scale)
    },
]

function keyPressed() {
    if( keyCode === 32 ) {
	save()
    }
}

function mouseClicked() {
    draw()
}

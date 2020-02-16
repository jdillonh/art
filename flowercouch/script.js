class Flower {
    constructor( x, y, rad ) {
	this.x = x
	this.y = y
	this.rad = rad
	this.numPedals = 4
    }

    draw() {
	push()
	translate( this.x, this.y )
	ellipse( 0, 0, this.rad/2, this.rad/2 )
	let angle = - 3 * QUARTER_PI
	//if( Math.random() > 0.5 ) {
	//    rotate( PI/3 )
	//}
	for( let i = 0; i < this.numPedals; i++ ) {
	    angle -= HALF_PI * i
	    push()
	    rotate(angle)
	    if( Math.random() < density ) {
		drawPedal(this.rad)
	    }
	    pop()
	}
	pop()
    }
}





var themes = [
    [
	"#FFAD52",
	"#E8634F",
	"#FF63F6",
	//"#794FE8",
	"#BA62FF",
	"#007BFF",
    ],
    [
	"#67B505",
	"#E89707",
	"#FF5408",
	"#FFE205",
	"#018520",
    ]
]
var colors = themes[1]
var bgColor = colors[4]

var density = 0.6
var thickness = 3


var can;
var w = 600
var h = 600
var numRow = 8
var margin = 80
var rad = (w - margin) / numRow / 2
var flowers = new Array(numRow * numRow)

function setup() {
    can = createCanvas( w,
			h )
    strokeWeight(thickness)

    for( let i = 0; i < flowers.length; i++ ) {
	print((i%numRow) / numRow )
	flowers[i] = new Flower( lerp( margin, width - margin, ((i%(numRow)) / (numRow-1) )),
			         lerp( margin, height - margin, Math.floor(i/(numRow)) / (numRow-1) ),
				 rad )
    }
}

function draw() {
    fill(colors[3])
    background(bgColor)
    noLoop()
    push()
    console.log(flowers)
    for( f of flowers ) {
	stroke(colors[ Math.floor(Math.random()*3)])
	f.draw()
    }
    pop()

}

function keyPressed() {
    if( keyCode === 32 ) {
	save()
    }
    else if( keyCode === 65 ) {
	// 'a'
	setup()
	draw()
    }
    print(keyCode)
}

function drawPedal(rad) {
    push()
    ellipseMode(CENTER)
    translate(0, rad/1.2 )
    ellipse(0, 0, rad/3, rad/1.8)
    pop()
}


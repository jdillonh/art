// WIP
// can't figure out how to do
// what I want to do so...
var can
var height = 800
    width = 450
var center
var slices = new Array(20)

function setup() {
    can = createCanvas( 800,
			450 )

    center = { x : width / 2,
	       y : height / 2 }

    for( let i = 0; i < slices.length; i++ ) {
	let newY = i / slices.length * height + 1 // + 1 is for antialiasing issues
	slices[i] = new Slice( newY )
    }

}

function draw() {

    for( s of slices ) {
	s.draw()
    }

}

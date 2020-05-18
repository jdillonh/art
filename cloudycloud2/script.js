let obj = [];
let t = 0;
let dt = 0.01;

let captureLen = 240;
let capturer;
let captureCanvas;
let hasSaved = false;
let shouldCapture = false;

var can;
var height = 1080,
    width  = 1080;

var C = {
    teal : 'teal',
    blue : "#aee5d8",
    brown : "#654321",
    pink : 'pink',
    white : "#FFFCF0",
    purple : 'lavender',
}

function setup() {
    can = createCanvas( 1080,
			1080 );
    captureCanvas = can.canvas;

    if( shouldCapture ) {
	capturer = new CCapture( { format: 'png',
				   //frameRate: 60,
				   //verbose: true,
				 } );
	capturer.start();
    }
    noStroke();
}

function draw() {
    background(C.purple);

    const numCell = 10;
    let xOff = width / (numCell + 1);
    let yOff = height / (numCell + 1);
    for( let x = 0; x < numCell; x++ ) {
	for( let y = 0; y < numCell; y++ ) {
	    let currX = (x+1)*xOff + sin(t)*10
	    let currY = (y+1)*yOff
	    for(let i = 0; i < 3; i++) {
		let off = 20 * i
		let newbie =  makeDrawCirc(off*i+currX, off*i+currY,
					   [C.blue, C.purple, C.pink][i]);
		obj.push( newbie );
	    }
	}
    }

    obj = obj.filter((f) => {return f()});
    t += dt;
    if( shouldCapture ) { 
	capturer.capture(captureCanvas);
    }
    if( !hasSaved && frameCount >= captureLen && shouldCapture ) {
	hasSaved = true;
	capturer.stop();
	capturer.save();
    }
}

function makeDrawCirc(x, y, col) {
    let timeCreated = t
    return function() {
	let timeAlive = t - timeCreated
	fill(col); 
	circle(x, y, 70*sin(timeAlive * Math.PI));
	return timeAlive < 1
    }
}

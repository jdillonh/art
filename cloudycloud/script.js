let numCirc = 10;
let t = 0;
let dt = .009;
let offset = 1080/40;

let captureLen = 400;
let capturer;
let captureCanvas;
let hasSaved = false;
let shouldCapture = false;

function setup() {
    let c = createCanvas(1080, 1080);
    captureCanvas = c.canvas;
    frameRate(60);

    fill('blue')
    noStroke('#654321');
    strokeWeight(0);

    if( shouldCapture ) {
	capturer = new CCapture( { format: 'png',
				   frameRate: 60,
				   verbose: true,
				 } );
	capturer.start();
    }
}

function draw() {

    t += dt;
    background(174, 216, 229);
    let stepX = width / (numCirc + 1);
    let stepY = height / (numCirc + 1);
    push();
    translate(-offset, -offset);
    for(let x = 0; x < numCirc; x++ ) {
	for(let y = 0; y < numCirc; y++ ) {
	    push()
	    
	    fill('#FFFCF0'); //cream
            translate( (x+1) * stepX, (y+1) * stepY);
            let nv = getNV(x, y, t);
            
            circle(0, 0, width/10*nv);
	    pop()
	}
    }
    pop();
    for(let x = 0; x < numCirc; x++ ) {
	for(let y = 0; y < numCirc; y++ ) {
	    push()
	    
	    fill('#654321'); //brown
            translate( (x+1) * stepX, (y+1) * stepY);
            let nv = getNV(x, y, t);
            
            circle(0, 0, width/10*nv);
	    pop()
	}
    }
    push()
    translate(offset, offset)
    for(let x = 0; x < numCirc; x++ ) {
	for(let y = 0; y < numCirc; y++ ) {
	    push()
	    fill('pink');
            translate( (x+1) * stepX, (y+1) * stepY);
            let nv = getNV(x, y, t);
            fill('pink');
            circle(0, 0, width/10*nv);
	    pop()
	}
    }
    pop()

    if( shouldCapture ) { 
	capturer.capture(captureCanvas);
    }

    if( !hasSaved && frameCount >= captureLen && shouldCapture ) {
	hasSaved = true;
	capturer.stop();
	capturer.save();
    }


}

function getNV(x, y, t) {
    let nv = (sin(t + x));//noise(x/10, y/10, t)
    nv += sin(t+y);
    nv = abs(nv);
    return 0.05 + nv
}

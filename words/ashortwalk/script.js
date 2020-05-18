let sqrNum = 6;
let ispeed = 20;
let sqrSize = 100;

let captureLen = 240;
let capturer;
let captureCanvas;
let hasSaved = false;
let shouldCapture = false;

function setup() {
    let p5can = createCanvas(400, 500);
    captureCanvas = p5can.canvas;
    frameRate(60);

    rectMode(CENTER);
    fill('teal');
    stroke('pink');
    strokeWeight(10);
    background(174, 216, 229);
    textSize(50);
    if( shouldCapture ) {
	capturer = new CCapture( { format: 'png',
				   //frameRate: 60,
				   //verbose: true,
				 } );
	capturer.start();
    }
}

function draw() {
    //background(174, 216, 229)//, 10);
    if( shouldCapture ) { 
	capturer.capture(captureCanvas);
    }

    let t = frameCount / ispeed;
    let stepY = height / (sqrNum +1);
    let x = width / 2;
    for (let i = 0; i < sqrNum; i++) {
	let angleOffset = (Math.PI / sqrNum) * i
	let y = stepY * (i + 1) - 30;
	push();
	translate(x, y);
	scale(sin(t + angleOffset));
	rotate(sin(t + angleOffset));
	/*push();
	  for (let i = 0; i < 5; i++) {
	  translate(50, 0);
	  square(0, 0, 80/i);
	  }
	  pop();
	  fill('teal');
	  square(0, 0, sqrSize); */
	fill('#654321');
	text("a short walk", 0, 0);
	pop();

    }
    if( !hasSaved && frameCount >= captureLen && shouldCapture ) {
	hasSaved = true;
	capturer.stop();
	capturer.save();
    }

}

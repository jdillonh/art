

var can;
var height = window.innerHeight,
    width  = window.innerWidth

function setup() {
    can = createCanvas( window.innerWidth,
			window.innerHeight )
    console.log("loaded");
    noStroke()
    fill('red');
    frameRate(30)

}

function draw() {
    //background(0, 5);
    fill(127.5+sin(frameCount/80)*127.5)
    let rows = 1
    let y = height/2
    for(let x = 0; x < width/2; x+=2){ 
	// increase number of particles for a cool thang
	circle((x*2 + frameCount/20) % width, y+sin(x+frameCount/200)*height/2, sin(x)*20);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight) 
}


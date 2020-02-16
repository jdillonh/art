let maxTTL =3
let circleSize = 30

var print = console.log;
var can;

var height = window.innerHeight,
    width  = window.innerWidth;

var t = Date.now();

var lastClickT = null;
var tempo = false;
var tempoText = "click";

var circles = []; // let every circle be a lil {x, y, ttl}

let myFont;
function preload() {
  myFont = loadFont('BungeeShade.ttf');
}

function setup() {
    textFont(myFont);
    can = createCanvas( window.innerWidth,
			window.innerHeight );
    fill(0);
}

function draw() {
    let now = Date.now();
    let dt = now - t;
    t = now;

    background(255);
    
    for( let c of circles ){
	//c.ttl -= dt/1000;
	c.ttl = c.ttl/1.03 - 0.01;
	circle(c.x, c.y, c.ttl * circleSize);
    }
    while(circles.length > 0 && circles[0].ttl < 0 ) {
	circles.shift();
    }
    if(tempo){
	tempoText = parseInt(tempo);
    }
    textSize(100);
    let w = 150
    let h = 150
    text(tempoText, width/2-w, height/2-h, w, h);

}

function mousePressed(){
    //defines mouseX and mouseY
    //when the mouse goes DOWN, not up 
    circles.push({x:mouseX, y:mouseY, ttl:maxTTL});
    let now = Date.now();
    tempo = 60000 / (now - lastClickT);
    lastClickT = now;
    print(tempo);
}

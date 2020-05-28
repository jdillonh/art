
var can;
var height = window.innerHeight,
    width  = window.innerWidth

var ctx;

var numSquiqs = 20;
var squigs = [];
var dt = 0.06;
var mouseIsDown = false

function setup() {
    can = createCanvas(window.innerWidth,
		       window.innerHeight);

    ctx = can.drawingContext;
    can.mousePressed(() => {
	mouseIsDown = true;
    });
    can.mouseReleased(() => {
	mouseIsDown = false;
    });
    
    stroke(255);
    background(0);
}

function draw() {
    background(40, 20);
    newSquigClick();
    //squigs.forEach(e => {
    //	e.draw(dt)
    //});

    squigs = squigs.filter( (s)=> {
	return s.draw(dt);
    })
}


function keyPressed() {
    if (keyCode == 32 ) {
    }
}

function newSquigClick() {
    if( !mouseIsDown ) {
	return;
    }
    let x = mouseX;
    let y = mouseY;
    squigs.push(new squig(x, y));
}

function lerp(x, y, t) {
    return  (1-t)*x + t*y;
}

class squig {

    constructor(x, y) {
	this.x = x;
	this.y = y;
	this.drawX = this.x;
	this.drawY = this.y;
	this.a = Math.random()*2*Math.PI;
	this.centerX = x;
	this.centerY = y;
	this.rad = 0;
	this.drawRad = 50;
	this.newPointRad = 20;
	this.timeScale = Math.random() > 0.5 ? 1 : -1;
	this.isFirstFrame = true;
	this.maxTTL = 200;
	this.TTL = this.maxTTL;
    }

    draw(_dt) {
	if( Math.random() * 1000 < 20) { 
	    this.newSwing();
	}
	this.TTL--;
	this.a += this.timeScale*_dt;
	let oldX = this.drawX;
	let oldY = this.drawY;
	this.x = this.centerX + this.rad * Math.cos(this.a);
	this.y = this.centerY + this.rad * Math.sin(this.a);
	this.drawX = lerp(this.drawX, this.x, 0.09);
	this.drawY = lerp(this.drawY, this.y, 0.09);
	fill('white')
	noStroke();
	//circle(this.centerX, this.centerY, 5);
	//circle(this.x, this.y, this.drawRad)
	stroke('white');
	strokeWeight(lerp(0, this.drawRad, this.TTL/this.maxTTL));
	if(this.isFirstFrame) {
	    this.isFirstFrame = false;
	}
	else {
	    line(oldX, oldY, this.drawX, this.drawY);
	}

	if( this.TTL <= 0 ) {
	    return false;
	}
	return true;
    }

    newSwing() {
	let oldCX = this.centerX;
	let oldCY = this.centerY;
	let newPointA = Math.random()*2*Math.PI;
	let newPointRad = Math.random()*this.newPointRad + this.newPointRad;
	this.centerX = this.x + Math.cos(newPointA) * newPointRad;
	this.centerY = this.y + Math.sin(newPointA) * newPointRad;
	//this.a = Math.atan2(this.x-this.centerX,
	//		    this.y-this.centerY);
	this.a = Math.atan2(this.y-this.centerY,
			    this.x-this.centerX);
	//this.a = Math.atan2(this.centerX - this.x,
	//		    this.centerY - this.y);
	this.rad = dist(this.centerX, this.centerY,
			this.x, this.y);
	if(Math.random() > 0.5) {
	    this.timeScale *= -1;
	}
    }

}


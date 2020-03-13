
var can;
var ctx;
var height = window.innerHeight,
    width  = window.innerWidth

function start() {

    can = document.getElementById("my-canvas");
    ctx = can.getContext("2d");
    wowee();
}

function render() {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, can.width, can.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(10, 10, 100, 100);

    requestAnimationFrame(render);
}

start();
render();

async function wowee () {
    let x = 0;
    let y = 0;
    while(true) {
	console.log("yo-yo" + x + y);
	ctx.fillStyle = "cream";
	ctx.fillRect(x, y, 10, 10);
	x+=10;
	y+=10;
	await sleep(100);
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function nop() { console.log('nop'); requestAnimationFrame(nop) };
nop();


function resolveAfter1Second () {
  return new Promise(resolve => {
    setTimeout(function() {
    }, 1000);
  });
};


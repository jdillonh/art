var mag = 20;
var colors = [
    'blue',
    'yellow',
    'green',
];

var can;
var height = window.innerHeight,
    width  = window.innerWidth

function setup() {
    can = createCanvas( window.innerWidth,
			window.innerHeight )

}

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

bodies = [
    function( x, y ) {
	fill( choose(colors) );
	let vari = 5;
	rect( x-Math.random()*vari + 5, y-5, 20*mag, 24*mag);
    },

    function( x, y ) {
	fill(choose(colors));
	circle( x, y, 23*mag );
    },

]

function draw() {

    noLoop();

}

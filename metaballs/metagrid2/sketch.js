// make canvas 686 x 2308


// in this sketch we're going to send a time variable to the shader
// https://p5js.org/reference/#/p5.Shader/setUniform

//this is perfect on Full screen
// just gotta figure out the loop

// TO get them in 1/2 offset just mult final time
// value by 1.5 right??

// a shader variable
let uniformsShader;
let allOrbs;
let can;
let DOMCanvas;
let numOrbs = 28;

let recording = false;
let capturer;
let captureLen = 60 * 5; // 5 sec
function preload(){

    // load the shader
    uniformsShader = loadShader('vert.glsl', 'frag.glsl');
}

function setup() {

    capturer = new CCapture( {
	framerate : 60,
	format : 'png',
	verbose : false,
    })
    if (recording) {
	capturer.start()
    }
    frameRate(15);


    // shaders require WEBGL mode to work
    can = createCanvas( 640, 640, WEBGL ) //this is apparently an abstraction
    DOMCanvas = can.canvas //so un-abstract it
    can.parent('can-parent');
    noStroke()


    shader( uniformsShader );
    uniformsShader.setUniform( 'width',
			       can.width )

    uniformsShader.setUniform( 'height',
			       can.height )
}

function draw() {
    // shader() sets the active shader with our shader
    

    // rect gives us some geometry on the screen
    rect( 0, 0, width, height);
    uniformsShader.setUniform('time', frameCount*5);
    if( recording ) {
	if( frameCount < captureLen ) {
	    capturer.capture( DOMCanvas )
	}
	else if( frameCount === captureLen ) {
	    console.log( " all done " );
	    capturer.stop()
	    capturer.save()
	}
    }
}

(function() {
    var el = document.getElementById("rotation");
    el.oninput = () => {
	uniformsShader.setUniform( "rotation", el.value / 100)
    }
})();
(function() {
    var el = document.getElementById("smoothness");
    el.oninput = () => {
	uniformsShader.setUniform( "smoothness", el.value / 100)
    }
})();
(function() {
    var el = document.getElementById("thresh");
    el.oninput = () => {
	uniformsShader.setUniform( "thresh", el.value)
    }
})();
(function() {
    var el = document.getElementById("density");
    el.oninput = () => {
	uniformsShader.setUniform( "density", el.value / 100)
    }
})();
(function() {
    var el = document.getElementById("reset");

    el.onclick = () => {
	document.getElementById("rotation").value = 0;
	document.getElementById("smoothness").value = 0;
	document.getElementById("thresh").value = 0;
	document.getElementById("density").value = 0;

	document.getElementById("rotation").oninput();
	document.getElementById("smoothness").oninput();
	document.getElementById("thresh").oninput();
	document.getElementById("density").oninput();
    }
})();
window.onload = () => {
    document.getElementById("rotation").value = 0;
    document.getElementById("smoothness").value = 0;
    document.getElementById("thresh").value = 0;
    document.getElementById("density").value = 0;

    document.getElementById("rotation").oninput();
    document.getElementById("smoothness").oninput();
    document.getElementById("thresh").oninput();
    document.getElementById("density").oninput();
};



/*function windowResized(){
  resizeCanvas( windowWidth, windowHeight );
  uniformsShader.setUniform( 'width',
  can.width )

  uniformsShader.setUniform( 'height',
  can.height )
  }*/



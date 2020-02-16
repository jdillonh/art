
var can;
var height = window.innerHeight,
    width  = window.innerWidth
var zoom = 300
var img1, img2, mask
var t
var dt = 0.01

function setup() {
    t = 0
    can = createCanvas( window.innerWidth,
			window.innerHeight )
    img1 = createImage()
    background( 0, 255, 0 )
    img1 = get( 0, 0, width, height )
    img2 = createImage()
    background( 0, 0, 255 )
    img2 = get( 0, 0, width, height )

    mask = createImage( width, height )
}

function draw() {
    background( 255 )
    t += dt
    mask.loadPixels()
    pixels = mask.pixels;

    for( let w = 0; w < mask.width ; w++ ) {
    	for( let h = 0; h < mask.height; h++ ) {
    	    mask.set( w, h, color( 0, 0, 0, 0 ))
    	    let val = 255 * ( 1 + noiseLib.simplex2( t + w / zoom, h / zoom ) )
    	    val = val < 255 ?
    		0 :
    		255
    	    mask.set( w, h, color( 0, 0, 0, val ))
    	}
    }
    mask.updatePixels()

    image( img1, 0, 0 )
    img2.mask( img1 )
    img2.mask( mask )
    image( img2, 0, 0 )

}

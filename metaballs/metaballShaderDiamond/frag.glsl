precision mediump float;
const int numOrbs = 28;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our time uniform variable coming from p5
uniform float width;
uniform float height;
uniform float time;
uniform float orbState[ numOrbs * 3 ];

//const vec3 col2 = vec3(0., 0., 0.); //
//const vec3 col1 = vec3(1., 1., 1.);//
//vec3( 255. / 255.0 , 172. / 255.0 , 156. / 255.0 ) ;//vec3(0., 0., 0.);//
//vec3( 0. / 255.0 , 40. / 255.0 , 43. / 255.0 ) ;//vec3(1., 1., 1.);//
const vec3 col2 = mix( vec3( 96. / 255., 97./255., 189./255.),
		       vec3( 0., 0., 0.),
		       0.50 );
const vec3 col1 = vec3( 255./255.,  242./255., 181./255.);
//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
  vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
			   6.0)-3.0)-1.0,
		   0.0,
		   1.0 );
  rgb = rgb*rgb*(3.0-2.0*rgb);
  return c.z * mix( vec3(1.0), rgb, c.y);
}

void main() {

  float AR =  width / height;
  vec2 uv = vTexCoord;
  uv.x *= AR;
  float d = 0.0; 
  float curr;
  for( int i = 0; i < numOrbs * 3; i += 3 ) {
    //curr =  distance( uv , vec2( orbState[i] * AR, orbState[i + 1] ));
    //curr = orbState[i + 2] / curr ;
    curr = orbState[i + 2] /
      (abs( uv.x - orbState[i] * AR ) + abs( uv.y - orbState[i + 1] ));
    d += curr;
  }
  d = clamp( d, 0., 7. );
  d = sin( d );
  //d = pow( sin( d * 10. ), 2.0 );
  vec3 color = mix( col1, col2, d );
  if( d > 0.7 && d < 0.8 ) {
    gl_FragColor = vec4( col1.rgb, 1.0);
  }
  else {

    gl_FragColor = vec4( col2.rgb, 1.0);
  }
}



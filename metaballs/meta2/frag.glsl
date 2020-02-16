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

  
const vec3 col1 = vec3( 255./255., 250./255., 206./255.); //vec3( 255. / 255.0 , 172. / 255.0 , 156. / 255.0 ) ;//vec3(0., 0., 0.);//
const vec3 col2 = vec3( 235./255., 81./255., 54./255.); //vec3( 0. / 255.0 , 40. / 255.0 , 43. / 255.0 ) ;//vec3(1., 1., 1.);//
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
    curr = distance( uv , vec2( orbState[i] * AR, orbState[i + 1] ));
    curr = orbState[i + 2] / curr ;
    d += curr;
  }
  //d = clamp( d, 0.0, 1.0 );
  if( d > 0.3 ) {
    d = 0.7;
  }
  else {
    d += cos(time);
    d = sin( d * 50.0);// * sin( d * 10. );
  }
  //d = mix( sin( d * .5 ), (1.0 + sin( d * 2.0 )), (sin(time * 3.) / 2.) + 0.2 );
  // make a vec4 out of our circle variable
  //vec3 color = hsb2rgb( vec3( d, 1.0, 1.0 ));
  vec3 color = vec3( d, 0.0, d );
  if( d > 0.3 ) {
    gl_FragColor = vec4( col1.rgb, 1.0 );
  }
  else {
    gl_FragColor = vec4( col2.rgb, 1.0 );
  }
  //vec3 color = mix( col1, col2, d );
  //gl_FragColor = vec4( color.rgb, 1.0);
}



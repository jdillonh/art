precision mediump float;
const int numOrbs = 28;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our time uniform variable coming from p5
uniform float width;
uniform float height;
uniform float time;
uniform float orbState[ numOrbs * 3 ];
uniform float mouseX;
uniform float mouseY;

//const vec3 col2 = vec3(0., 0., 0.); //
//const vec3 col1 = vec3(1., 1., 1.);//

  
const vec3 col1 = vec3( 233./255., 199./255., 255./255.); //vec3( 255. / 255.0 , 172. / 255.0 , 156. / 255.0 ) ;//vec3(0., 0., 0.);//
const vec3 col2 = vec3( 255./255., 244./255., 200./255.); //vec3( 0. / 255.0 , 40. / 255.0 , 43. / 255.0 ) ;//vec3(1., 1., 1.);//
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
  float sinFactor = 50.0 * sin(10.0*distance(uv, vec2(mouseX*AR, 1.0-mouseY)));
  float d = 0.0; 
  float curr1;
  float curr2;
  for( int i = 0; i < numOrbs * 3; i += 3 ) {
    curr1 = distance( uv , vec2( orbState[i] * AR, orbState[i + 1] ));
    curr1 = orbState[i + 2] / curr1 ;

    curr2 = orbState[i + 2] /
      (abs( uv.x - orbState[i] * AR ) + abs( uv.y - orbState[i + 1] ));


    //d += mix(curr1, curr2, mouseX);
  }
  //d = clamp( d, 0.0, 1.0 );
  if( d > 0.3 ) {
    d = 0.7;
  }
  else {
    d += cos(time*2.0)/6.0;
    d = sin( d * sinFactor);// * sin( d * 10. );
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



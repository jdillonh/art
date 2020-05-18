
precision mediump float;

float hash(vec2 p)  // replace this by something better
{
    p  = 50.0*fract( p*0.3183099 + vec2(0.71,0.113));
    return -1.0+2.0*fract( p.x*p.y*(p.x+p.y) );
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );
	
	vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( hash( i + vec2(0.0,0.0) ), 
                     hash( i + vec2(1.0,0.0) ), u.x),
                mix( hash( i + vec2(0.0,1.0) ), 
                     hash( i + vec2(1.0,1.0) ), u.x), u.y);
}

// -----------------------------------------------

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 p = fragCoord.xy / iResolution.xy;

	vec2 uv = p*vec2(iResolution.x/iResolution.y,1.0);
	
	float f = 0.0;

    // left: value noise	
	if( p.x<0.6 )
	{
		f = noise( 32.0*uv );
	}
    // right: fbm - fractal noise (4 octaves)
    else	
	{
		uv *= 8.0;
        mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
		f  = 0.5000*noise( uv ); uv = m*uv;
		f += 0.2500*noise( uv ); uv = m*uv;
		f += 0.1250*noise( uv ); uv = m*uv;
		f += 0.0625*noise( uv ); uv = m*uv;
	}

	f = 0.5 + 0.5*f;
	
    f *= smoothstep( 0.0, 0.005, abs(p.x-0.6) );	
	
	fragColor = vec4( f, f, f, 1.0 );
}

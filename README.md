# fractal-gl
An nice Graphics API in constant evolution. 

## Features

- The API has a math library for 2d/3d vector and for 4x4 matrices. 
- WebGL buffer handling. 
- Shader API for easy shader linking. 
- Some geometry classes for efficient packing. 
- Texture capabilities is under construction.
- Multithread [Web Workers].


## For now only 2D, but here some demos showcasing the API.

- This is a koch fractal, with some linear interpolation between the points, [multi-thread] using webworkers. assign a thread to compute each side.
<br>
[http://cesarvr.github.io/fractal-gl/thread.html]

- This is a koch fractal, with some linear interpolation between the points. 
<br>
[http://cesarvr.github.io/fractal-gl/lerp_draw.html]

- Procedural generated old school XOR Texture.
<br>
[http://cesarvr.github.io/fractal-gl/sierpinski.html]

- Procedural generated old school XOR Texture.
<br>
[http://cesarvr.github.io/fractal-gl/texture_xor.html]




[http://cesarvr.github.io/fractal-gl/lerp_draw.html]: http://cesarvr.github.io/fractal-gl/lerp_draw.html
[http://cesarvr.github.io/fractal-gl/texture_xor.html]: http://cesarvr.github.io/fractal-gl/texture_xor.html
[http://cesarvr.github.io/fractal-gl/sierpinski.html]: http://cesarvr.github.io/fractal-gl/sierpinski.html
[http://cesarvr.github.io/fractal-gl/thread.html]: http://cesarvr.github.io/fractal-gl/thread.html

VR8.Stock2D = {};
VR8.Script = {};

VR8.Stock2D.vertex =
    'attribute vec3 position; \
     attribute vec4 colors; \
     uniform mat4 MV;\
     uniform mat4 P;\
     varying vec4 frag_color;\
     \
    void main(void) { \
      gl_Position = MV * P * vec4(position, 1.0);\
      frag_color = colors;\
     }';


VR8.Stock2D.fragment =
    'precision mediump float;\
     varying vec4 frag_color;\
\
    void main(void) {\
        gl_FragColor = frag_color;\
    }';



VR8.Stock2D.init = function(shader) {
    shader.use();
    shader
        .attribute('position')
        .attribute('colors')
        .uniform('MV')
        .uniform('P');

}



function getCode(from){
    return document.getElementById(from).innerHTML;
}

VR8.Script.vertex = getCode('vertex-shader');
VR8.Script.fragment = getCode('fragment-shader');

VR8.Script.init = function(shader) {
    shader.use();
    shader
        .attribute('position')
        .attribute('texture')
        .attribute('colors')
        .uniform('MV')
        .uniform('uSampler')
        .uniform('P');
}

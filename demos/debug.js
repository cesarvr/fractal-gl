(function() {

    var core = new VR8.Core(true);
    var buffer = new VR8.Buffer();
    var shader = new VR8.Shader();
    var frag = document.getElementById('fragment-shader').innerHTML;
    var vert = document.getElementById('vertex-shader').innerHTML;
    var camera = VR8.Camera.MakeOrtho(0, 50, 50, 0, 1, -1);
    var scene = new VR8.Scene2D();
   var gl = VR8.webGL; 
   gl.clearColor(0.5,0,0,1.0); 
   gl.clear(gl.COLOR_BUFFER_BIT ); 



}());

(function(){
  var a = document.getElementById('canvas-surface');
  var core   = new VR8.Core(a);
  var buffer = new VR8.Buffer();
  var shader = new VR8.Shader();
  
  var frag   = document.getElementById('fragment-shader').innerHTML;
  var vert   = document.getElementById('vertex-shader').innerHTML;
  var transform = Object.create(VR8.transform);
  var camera    = transform.ortho(0,50,50,0,1,-1);
  var scene     = new VR8.Scene2D();

  shader.link(vert, frag);
  
  var init_shader = function(){
    var p = shader.program;
    shader.use();
    
    shader
    .attribute('position')
    .uniform('MV')
    .uniform('P');
  }();

  var vertex = [   0.0,  -20.0, 0.0,
                 -15.0,   20.0, 0.0,
                  15.0,   20.0, 0.0,
                   0.0,  -20.0, 0.0 ];

  buffer.geometry({points: vertex, size: 3});
  
  var entity = {
    buffer: buffer,
    shader: shader, 
    varsGL: {
             'MV': camera, 
             'P' : transform.translate(25,25,0).m()
            },
    drawType: 'LINE_STRIP'
  }

  function render(){
    requestAnimFrame(render);
    scene.clean();
    scene.render(entity);
  }

  render();
}());

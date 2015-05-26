(function(){
  var a = document.getElementById('canvas-surface');
  var core   = new VR8.Core(a, true);
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
    .attribute('colors')
    .uniform('MV')
    .uniform('P');

    scene.shader = shader;
    scene.camera = camera;
  }();
  
  function create_vertex(v7){
      var buff = new Float32Array(7);
      if(typeof v7.pos !== 'undefined'){
        buff.set(v7.pos.get(), 0);
      }else
          throw 'missing vector3 for position.';
      
      if(typeof v7.color !== 'undefined') { 
        buff.set(v7.color.get(), 3); 
      }else
        buff.set([0.7,0.7,0.7,0.7], 3); //set to white as default.
      return buff;   
  }

  var line_triangle = VR8.geometry.mesh(20000000);

  var triangle = function(){
    var buffer = new VR8.Buffer();
    buffer.no_color_data = false;
    return {
        cord: function(p1, p2,p3){
            line_triangle.add( new Vector(  p1.x,  p1.y, 0.0) ); 
            line_triangle.add( new Vector(  p2.x,  p2.y, 0.0) ); 
            
            line_triangle.add( new Vector(  p1.x,  p1.y, 0.0) ); 
            line_triangle.add( new Vector(  p3.x,  p3.y, 0.0) ); 
            
            line_triangle.add( new Vector(  p3.x,  p3.y, 0.0) ); 
            line_triangle.add( new Vector(  p2.x,  p2.y, 0.0) );
            return this;
        },
        buffer: function(){ 
            buffer.geometry({points: line_triangle.buffer(), size: 7});
            return buffer; }
    }
  }();
var sierpinski = function(p1, p2, p3, limit){
        if(limit >0){
          var pa = {
            x: (p1.x + p2.x)/2,
            y: (p1.y + p2.y)/2
          }
          
          var pb = {
            x: (p2.x + p3.x)/2,
            y: (p2.y + p3.y)/2
          }

          var pc = {
            x: (p3.x + p1.x)/2,
            y: (p3.y + p1.y)/2
          }

          sierpinski(p1,pa,pc, limit-1);
          sierpinski(pa,p2,pb, limit-1);
          sierpinski(pc,pb,p3, limit-1);
        }else{
          triangle.cord(p1,p2,p3);
        }
  };
  
  sierpinski({x: 0.0, y: -24.0 }, {x: -20.0, y:20.0}, {x:20.0, y: 20.0}, 5);

  var entity = {
    buffer: triangle.buffer(),
    model: transform.translate(25,25,0).m(),
    drawType: 'LINES'
  }

  function init(){
  }

  function update(){
  }
  
  function render(){
    update();

    requestAnimFrame(render);
    scene.clean();
    scene.render(entity);
  }

  init();
  render();

}());

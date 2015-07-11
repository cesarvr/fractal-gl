(function(){
  var core   = new VR8.Core(true);
  var buffer = new VR8.Buffer();
  var shader = new VR8.Shader();
  var frag   = document.getElementById('fragment-shader').innerHTML;
  var vert   = document.getElementById('vertex-shader').innerHTML;
  var camera    = VR8.Camera.MakeOrtho(0,50,50,0,1,-1);
  var scene     = new VR8.Scene2D();
  var pos = {x:0, y:0};  
  var mov = {x:0, y:0}; 
  var zoomOut = false; 
 

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
  
  var line_triangle = VR8.geometry.mesh(160);

  var triangle = function(){
    var buffer = new VR8.Buffer();
    buffer.no_color_data = false;
    return {
        cord: function(p1, p2,p3, deep){
            var vec_gray = new Vector(0.6,0.7,0.7);
            deep = deep * 0.0001;
            line_triangle.add( new Vector(  p1.x,  p1.y, 0.0),vec_gray.multiplyByScalar(deep)  ); 
            line_triangle.add( new Vector(  p2.x,  p2.y, 0.0),vec_gray.multiplyByScalar(deep)   ); 
            
            line_triangle.add( new Vector(  p1.x,  p1.y, 0.0), vec_gray.multiplyByScalar(deep)  ); 
            line_triangle.add( new Vector(  p3.x,  p3.y, 0.0),vec_gray.multiplyByScalar(deep)   ); 
            
            line_triangle.add( new Vector(  p3.x,  p3.y, 0.0), vec_gray.multiplyByScalar(deep) ); 
            line_triangle.add( new Vector(  p2.x,  p2.y, 0.0), vec_gray.multiplyByScalar(deep)  );
            return this;
        },
        buffer: function(){ 
            buffer.geometry({points: line_triangle.buffer(), size: 7});
            return buffer; }
    }
  }();

  var level = 0;
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
            level ++;
          triangle.cord(p1,p2,p3,level);
        }
  };
  
  sierpinski({x: 0.0, y: -24.0 }, {x: -20.0, y:20.0}, {x:20.0, y: 20.0}, 0);
  
  var t = new VR8.Transform(); 
  t.translate(25,25).scale(1,1,0);
  var entity = {
    buffer: triangle.buffer(),
    model: t.m,
    drawType: 'LINES'
  }

  function init(){
  }
  var p = {x: 0, y:0};
  var f = new Vector(0.5,0.5,0);
  var zoomx1 = new Vector(1.0,1.0,0.0); 
  var step = new Vector(0.006, 0.006, 0.006); 
  var tm = 0; 
  var rot = 0.1;
  function update(){
      p.x += mov.x; 
      p.y += mov.y;
      rot += 1;
     // t.scale(f.v[0],f.v[1],0);
      t.rotateY(rot); ////.translate(25+p.x,25+p.y,0);
      f.add(step);
 
      if(zoomOut){
        tm+= 0.001; 
        VR8.Lerp(f,zoomx1, tm);
        if(tm >= 1){  zoomOut = false; tm=0;} 
      }  


  }
  
  function render(){
    //update();

    requestAnimFrame(render);
    scene.clean();
    scene.render(entity);
  }

  init();
  render();

}());

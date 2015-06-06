(function(){
  var a = document.getElementById('canvas-surface');
  var core   = new VR8.Core(a, true);
  var buffer = new VR8.Buffer();
  var shader = new VR8.Shader();
  var frag   = document.getElementById('fragment-shader').innerHTML;
  var vert   = document.getElementById('vertex-shader').innerHTML;
  var camera    = VR8.Camera.MakeOrtho(0,50,50,0,1,-1);
  var scene     = new VR8.Scene2D();
  var pos = {x:0, y:0};  
  var mov = {x:0, y:0}; 
  var zoomOut = false; 
 

  a.addEventListener('click', function(){ zoomOut = true;});

  a.addEventListener('mousemove', function(evt) {
  /* var tmp =  getMousePos(a,evt,{x: VR8.W, y:VR8.H} );
   console.log(pos);
   
   if(tmp){
   
    if(tmp.x > pos.x)
        mov.x=-0.03;
    else 
        mov.x=0.03;
   
    if(tmp.y > pos.y)
        mov.y=-0.03;
    else
        mov.y=0.03;
   }

    pos = tmp;
    */    
  });

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
  
  var line_triangle = VR8.geometry.mesh(20000000);

    
  var buffer = new VR8.Buffer();
  buffer.no_color_data = false;

  
  //triangle.cord({x: 0.0, y: -24.0 }, {x: -20.0, y:20.0}, {x:20.0, y: 20.0}, 9);
  
  a = new Vector(  9, 0, 0.0);
  b = new Vector( 0,  2, 0.0); 
  c = new Vector(  15, 2,0.0 ); 

  
  
  
  line_triangle.add(a, new Vector(0,1,0)  ); 
  line_triangle.add(b  ); 
  line_triangle.add(b  ); 
  line_triangle.add(c, new Vector(0,0,1)   ); 
    
  //line_triangle.add(b  ); 
  //line_triangle.add(a.project(c), new Vector(1,0,0)  ); 


  //line_triangle.add(a  ); 
  //line_triangle.add(a.sub(a.project(c)), new Vector(1,0,0)  ); 

  buffer.geometry({points: line_triangle.buffer(), size: 7});

 






  buffer.geometry({points: line_triangle.buffer(), size: 7});



  var t = new VR8.Transform(); 
  t.translate(25,25).scale(1,1,0);
  var entity = {
    buffer: buffer,
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
      //t.rotateY(rot); ////.translate(25+p.x,25+p.y,0);
      f.add(step);
 
      if(zoomOut){
        tm+= 0.001; 
        VR8.Lerp(f,zoomx1, tm);
        if(tm >= 1){  zoomOut = false; tm=0;} 
      }  


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

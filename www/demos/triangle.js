(function(){
  var a = document.getElementById('canvas-surface');
  var core   = new VR8.Core(a,true);
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
  /*
  var vertex = [   0.0,  -20.0, 0.0,
                 -15.0,   20.0, 0.0,
                  15.0,   20.0, 0.0,
                   0.0,  -20.0, 0.0 ];

*/

  var vertex =[];

  function sierpinski(p1, p2, p3, limit){
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
      draw_triangle(p1,p2,p3);
    }

  
  }
//the most memory inneficient triangle in the world :]
  function draw_triangle(p1, p2, p3){
    vertex = vertex.concat([p1.x, p1.y, 0.0]);
    vertex = vertex.concat([p2.x, p2.y, 0.0]);
    
    vertex = vertex.concat([p2.x, p2.y, 0.0]);
    vertex = vertex.concat([p3.x, p3.y, 0.0]);
    
    vertex = vertex.concat([p3.x, p3.y, 0.0]);
    vertex = vertex.concat([p1.x, p1.y, 0.0]);
  }
  
  sierpinski( {x: 0.0, y: -24.0 }, {x: -20.0, y:20.0}, {x:20.0, y: 20.0}, 9 );
  //draw_triangle( {x: 0.0, y: -20.0 }, {x: -15.0, y:20.0}, {x:15.0, y: 20.0});


   


  buffer.geometry({points: vertex, size: 3});
  
  var entity = {
    buffer: buffer,
    shader: shader, 
    varsGL: {
             'MV': camera, 
             'P' : transform.translate(25,25,0).m()
            },
    drawType: 'LINES'
  }

  var s = 0.001;
  function render(){
    s+=0.001;
    requestAnimFrame(render);

    scene.clean();
    //entity.varsGL.P = transform.scaling(1+s,1+s,1+s).m();
    entity.varsGL.P   = transform.scaling(1+s,1+s,1+s).multiply( transform.translate(25-s,20-s,0));
     //entity.varsGL.P = transform.rotate_x(s).m(); 
    scene.render(entity);
  }

  render();
}());

(function(){
  var a = document.getElementById('canvas-surface');
  var core   = new VR8.Core(a);
  var buffer = new VR8.Buffer();
  var shader = new VR8.Shader();
  var mpos = {};
  
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

   var vertex = [   0.0,  -0.5, 0.0, 0.9,0.9,0.4,0.4,
                 -0.5,   0.5, 0.0, 0.9,0.9,0.4,0.4,
                  0.5,   0.5, 0.0,0.9,0.9,0.4,0.4,
                   0.0,  -0.5, 0.0, 0.1,0.1,0.1,0.1];

  buffer.no_color_data = false;
  buffer.geometry({points: vertex, size: 7});
  


  var entity = {
    buffer: buffer,
    model: transform.translate(25,25,0).m(),
    drawType: 'TRIANGLE_STRIP'
  }

  var light = new Vector(25, 25, 0.0);


 

    a.addEventListener('click', function(evt){

    mpos = getMousePos(a, evt, {x:50, y:50});


  },false);

  var points = [];

  function init(){
    for(var i =0; i<=10; i++){
      var p = new VR8.Point({r:0.5, g:0.5, b:0.5, a:1.0});
      p.position(randomN(50),randomN(50),0);
      points.push(p);
    }
  }



  
   var t = 0.001; 

  function update(){

    points.forEach(function(p){
       if(t>1.0) t=0.001;
       p.update();
       //p.position(mpos.x,mpos.y, 0);

       
       var ptmp = p.pos.normalize();
       var ltmp = light.normalize();
       //console.log(ptmp.dot(ltmp));
       if(ltmp.dot(ptmp) < 1) debugger;

    if(mpos.x && mpos.y && p.pos)
      VR8.Lerp(p.pos, new Vector(mpos.x, mpos.y, 0.0), t);
    
    });
    t+=0.00001;
   


  }


  function render(){
    update();

    requestAnimFrame(render);
    scene.clean();
    scene.render(entity);
    points.forEach(function(p){
      scene.render(p.get_entity());
    });
  }

  init();
  render();

}());

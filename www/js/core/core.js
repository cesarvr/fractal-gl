var VR8 = VR8 || {};

VR8.Core = function(canvas, fullscreen){

  var init = function(){
    var _canvas = canvas, gl; 

    try{	
      gl = _canvas.getContext("experimental-webgl");

      VR8.webGL = gl;
      if(fullscreen){
        _canvas.style.width = window.innerWidth + "px";
        _canvas.style.height = window.innerHeight + "px";
      }

      VR8.W = _canvas.width;
      VR8.H = _canvas.height;
    
    }catch(e){
      console.log(e);
    }

    if(!gl)
      console.log('can init WebGL :[');
  }();
}

VR8.Scene2D = function(){

  var Width  = VR8.W; 
  var Height = VR8.H;
  var gl = VR8.webGL;
  this.shader = {};
  this.camera = {};


  this.clean = function(){
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
  }

  this.render = function(entity){
    gl.viewport(0, 0, Width, Height);
    
    this.shader.prepare({'MV':this.camera, 'P':entity.model});
    
    gl.bindBuffer(gl.ARRAY_BUFFER, entity.buffer.buffer );

    entity.buffer.upload_vertex(this.shader.vars.position);
    entity.buffer.upload_colors(this.shader.vars.colors);

      
    if(typeof gl[entity.drawType] === 'number')
      gl.drawArrays(gl[entity.drawType], 0, entity.buffer.sides);
    else
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, entity.buffer.sides);
      
  }
}


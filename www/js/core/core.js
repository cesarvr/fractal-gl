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
      debugger;
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
  
  this.setShader = function(){
    
  };  
  
  this.clean = function(){
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
  }

  this.render = function(entity){
    gl.viewport(0, 0, Width, Height);
    
    gl.clear(gl.COLOR_BUFFER_BIT); 
    for(var i in entity.varsGL){
      var v = entity.varsGL[i]; 
      gl.uniformMatrix4fv(entity.shader.vars[i],false, v);
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, entity.buffer.buffer );
    gl.vertexAttribPointer(entity.shader.vars.position, entity.buffer.size, gl.FLOAT, false, 0, 0);
      
    if(!gl[entity.drawType])
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, entity.buffer.sides);
    else
      gl.drawArrays(gl[entity.drawType], 0, entity.buffer.sides);
  }
}


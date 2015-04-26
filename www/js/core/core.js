var VR8 = VR8 || {};

VR8.Core = function(el){

  function init(){
    var _canvas = canvas, gl; 

    try{	
      gl = _canvas.getContext("experimental-webgl");
      gl.viewportWidth = _canvas.width;
      gl.viewportHeight = _canvas.height;
      VR8.webGL = gl;

    }catch(e){
      console.log(e);
    }

    if(!gl)
      console.log('can init WebGL :[');
  }();
}

VR8.Scene2D = function(w,h){
  var Width  = w; 
  var Height = h;
  var gl = VR8.webGL;
  this.clean = function(){
  
  }

  this.render = function(){
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.viewport(0, 0, Width, Height);
    gl.clear(gl.COLOR_BUFFER_BIT); 
    o.shader.ugpu(o.position, VR8.Camera().ortho());	
    gl.bindBuffer(gl.ARRAY_BUFFER,o.geometry.buffer );
    gl.vertexAttribPointer(o.shader.vpos, o.geometry.buffer.vertex, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, o.geometry.buffer.components);

  }
}



VR8.GFX = function(canvas){
 var _canvas = canvas, gl; 
 var object = {};  

 var init = function(){	 
  try{	
    gl = _canvas.getContext("experimental-webgl");
    gl.viewportWidth = _canvas.width;
    gl.viewportHeight = _canvas.height;
    VR8.webGL = gl;

  }catch(e){
    console.log(e);
  }

  if(!gl)
    console.log('can init WebGL :[');
 }();

 return {
        quad: function(){
          var vertex = [ 1.0,  1.0, 0.0,
                        -1.0,  1.0, 0.0,
                         1.0, -1.0, 0.0, 
                        -1.0, -1.0, 0.0  ];

          var quad = new VR8.Buffer(gl);
          return quad.upload_geometry(vertex);
        },

        shader: function(name_vertex, name_fragment){
          var sp = VR8.Shader(name_vertex, name_fragment);
          
          gl.useProgram( sp );
          sp.vpos = gl.getAttribLocation(sp, "position");
          gl.enableVertexAttribArray(sp.vpos);
          
          sp.p = gl.getUniformLocation(sp, 'P');
          sp.mv  = gl.getUniformLocation(sp, 'MV'); 
          
          sp.ugpu = function(p_matrix, mv_matrix){
            gl.uniformMatrix4fv(sp.p, false, p_matrix);
            gl.uniformMatrix4fv(sp.mv,  false, mv_matrix);  
          }
          return sp;
        },
        

	render: function(entity){
          var o = entity.get();  
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          gl.viewport(0, 0, gl.viewportWidth,gl.viewportHeight);
          gl.clear(gl.COLOR_BUFFER_BIT); 
          o.shader.ugpu(o.position, VR8.Camera().ortho());	
          gl.bindBuffer(gl.ARRAY_BUFFER,o.geometry.buffer );
          gl.vertexAttribPointer(o.shader.vpos, o.geometry.buffer.vertex, gl.FLOAT, false, 0, 0);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, o.geometry.buffer.components);
  }
 };
};



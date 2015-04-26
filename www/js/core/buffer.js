VR8.Buffer = function(){
  var gl = VR8.webGL; 
  
  this.buffer = null;
  this.render_type = gl.STATIC_DRAW; 
  this.size  = 0;

  this.geometry = function(g){
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer); 
    gl.bufferData( 
                  gl.ARRAY_BUFFER,
                   new Float32Array(g.points),
                   render_type
                 );
    
    size = g.size; 
  }
}

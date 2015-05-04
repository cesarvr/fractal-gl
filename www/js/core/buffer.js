VR8.Buffer = function(){
  var gl = VR8.webGL; 
  
  this.buffer = null;
  this.render_type = gl.STATIC_DRAW; 
  this.size  = 0;

  this.geometry = function(g){
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer); 
    gl.bufferData( 
                  gl.ARRAY_BUFFER,
                   new Float32Array(g.points),
                   this.render_type
                 );
    
    this.size  = g.size; 
    this.sides = g.points.length / g.size; 
  }
}

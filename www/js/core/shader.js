VR8.Shader = function(){
  var gl = VR8.webGL; 
  this.program = null;
  this.vars = {}; 

  this.add = function(shaderCode, type){
    var shader = null; 

    if( type === 'fragment' )
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    
    if( type === 'vertex' )
      shader = gl.createShader(gl.VERTEX_SHADER); 
    
    if(!shader) throw 'invalid shader code!!' + dom;
   
    gl.shaderSource(shader, shaderCode);
    gl.compileShader(shader);
    return shader;
  }
  
  this.use = function(){
    gl.useProgram(program);
  }
  
  this.attribute = function(param){
    this.vars[param] = gl.getAttribLocation(program, param);
    gl.enableVertexAttribArray(this.vars[param]);
    return this;
  }
  
  this.uniform = function(param){
    this.vars[param] = gl.getUniformLocation(program, param);
    return this;
  }


  this.link = function(vertex, fragment){
    program = gl.createProgram();
    
    gl.attachShader( program, this.add(vertex,  'vertex')  );
    gl.attachShader( program, this.add(fragment,'fragment'));
    gl.linkProgram( program ); 
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw 'error linking shaders';
    }
  }

  this.prepare = function(varsGL){
    for(var var_name in varsGL){
      var value = varsGL[var_name]; 
      gl.uniformMatrix4fv(this.vars[var_name], false, value);
    }
  }



}

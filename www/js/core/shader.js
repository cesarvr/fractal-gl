VR8.Shader = function(){
  var gl = VR8.webGL; 
  this.program = null;

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

  this.link = function(vertex, fragment){
    program = gl.createProgram();
    
    gl.attachShader( program, this.add(vertex,  'vertex')  );
    gl.attachShader( program, this.add(fragment,'fragment'));
    gl.linkProgram( program ); 
    
    if (!gl.getProgramParameter(program,, gl.LINK_STATUS)) {
      throw 'error linking shaders';
    }
  }
}







VR8.Shader = function(name_vertex, name_fragment){
  var gl = VR8.gl;

  var load_shader = function(dom){
    var shader;
    if(dom.type ==='fragment') 
     shader = gl.createShader(gl.FRAGMENT_SHADER);
    else if(dom.type === 'vertex')
     shader = gl.createShader(gl.VERTEX_SHADER);
    
    if(!shader) throw 'invalid shader code!!' + dom;
   
    gl.shaderSource(shader, dom.innerHTML);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw '['+ dom.type +']'+'compilation failed: ' +  gl.getShaderInfoLog(shader);
      return null;
    }
    return shader;
 };

 return function(name_vertex, name_fragment){
          var sp = gl.createProgram();
          
          var v = document.getElementById(name_vertex);
          gl.attachShader( sp, load_shader(v) );
          
          var f = document.getElementById(name_fragment);
          gl.attachShader( sp, load_shader(f) );
          gl.linkProgram( sp ); 
          
          if (!gl.getProgramParameter(sp, gl.LINK_STATUS)) {
            throw 'error linking shaders';
          }
          return sp;
 }(name_vertex, name_fragment);
}


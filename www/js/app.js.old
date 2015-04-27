(function(){
'use strict';

var VR8 = VR8 || {}; 


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

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

VR8.Entity2D = function(){
  var obj = {};
  obj.model = new czmath.matrix4()
                           .set_identity();

  return {
    shader: function(shader){
      obj.shader = shader;
    },
    
    geometry: function(geometry){
      obj.geometry = geometry;
    },

    position: function(x,y){
      var t = czmath.transform.translate(x,y,0.0);
      obj.position = obj.model.multiply(t);
    },

    get: function(){
      return obj;
    }

  };
}


VR8.GFX = function(canvas){
 var _canvas = canvas, gl; 
 var object = {};  

 var VERTEX_SIZE = 3;

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

VR8.Camera = function(){
  return {
    ortho: function(){
      return czmath.transform.ortho(0,50,50,0,1,-1);
    }
  }
}

 var canvas = document.getElementById('canvas-surface');
 var vr = new VR8.GFX(canvas);
 var shader = vr.shader('vertex-shader', 'fragment-shader'); 
 var buffer = vr.quad();
 var entity = new VR8.Entity2D();
 
 var x = 0;






function init(){
 entity.shader(shader);
 entity.geometry(buffer);
 entity.position(40,40);



}

function render(){
x+=0.6;
requestAnimFrame(render);
vr.render(entity);
entity.position(Math.sin(x)+25, 25); 
//console.log(Math.sin(x));
}






init();
render();

}());

(function(){






var VR8 = function(canvas){
 var _canvas = canvas, gl; 
 var VERTEX_SIZE = 3;

 var init = function(){
 	 
	try{	
  		gl = _canvas.getContext("experimental-webgl");
		gl.viewportWidth = _canvas.width;
		gl.viewportHeight = _canvas.height;

	}catch(e){
		console.log(e);
	}

	if(!gl)
		console.log('can init WebGL :[');

 }();


 return {
 	buffer: function(array){
		var vertexBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, 
						vertexBuffer);

		gl.bufferData(gl.ARRAY_BUFFER, 
						new Float32Array(array), 
						gl.STATIC_DRAW);
	
		return {
			buffer: vertexBuffer, 
			size: (array.lenght / VERTEX_SIZE)
		}
	},

	render: function(){
		gl.viewport(0, 0, gl.viewportWidth, 
						  gl.viewportHeight);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


	},
 
 
 };

 
};


var canvas = document.getElementById('canvas-surface');
var vr = new VR8(canvas);


}());

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function getMousePos(canvas, evt, viewport) {
	var rect = canvas.getBoundingClientRect();
	var x = evt.clientX - rect.left;
  var y = evt.clientY - rect.top;

  x = viewport.x * x / rect.right;
   y = viewport.y * y / rect.bottom;
  return {
		x: x,
		y: y
	};
}

function randomN(val){

 return  Math.floor(Math.random() * val) + 1
}

function randomF(val){

 return (Math.random() * (0.000120 - val) + val);
}
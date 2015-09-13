'use strict';


var Core = function(fullscreen, el) {
    var _createCanvas = function() {
        _canvas = document.createElement('CANVAS');
        _canvas.setAttribute('width', 800);
        _canvas.setAttribute('height', 600);
        _canvas.setAttribute('style', 'position:absolute; left:0px; top:0px; border-style:none;');


        return _canvas;
    }


    var init = function() {
        var _canvas = _createCanvas();
        var $el = el || document.body; 
        
        $el.appendChild(_canvas);

        try {

            var gl = _canvas.getContext("experimental-webgl");

            if (!gl) {
                console.log('Error no webGL context found.');
                alert('no WebGL context found.')
            }

            VR8.webGL = gl;

            if (fullscreen) {
                _canvas.style.width = window.innerWidth + "px";
                _canvas.style.height = window.innerHeight + "px";
                _canvas.width = window.innerWidth;
                _canvas.height = window.innerHeight;
            }

            VR8.W = _canvas.width;
            VR8.H = _canvas.height;

        } catch (e) {
            console.log(e);
        }

    }();
}


module.exports = Core;

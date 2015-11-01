'use strict';

var Canvas = function(fullscreen, el) {
    var _createCanvas = function() {
        _canvas = document.createElement('CANVAS');
        _canvas.setAttribute('width', 800);
        _canvas.setAttribute('height', 600);
        _canvas.setAttribute('style', 'position:absolute; left:0px; top:0px; border-style:none;');
        return _canvas;
    }


    var _canvas = _createCanvas();
    var $el = el || document.body;

    $el.appendChild(_canvas);

    try {

        var gl = _canvas.getContext("experimental-webgl");

        if (!gl) {
            console.log('Error no webGL context found.');
            alert('no WebGL context found.')
        }

        if (fullscreen) {
            _canvas.style.width = window.innerWidth + "px";
            _canvas.style.height = window.innerHeight + "px";
            _canvas.width = window.innerWidth;
            _canvas.height = window.innerHeight;
        }

    } catch (e) {
        console.log(e);
    }

    return {
        getWebGL: function() {
            return gl;
        },
        canvas: {
            x: _canvas.width,
            y: _canvas.height
        },
        fullscreen: fullscreen,
    };
}

module.exports = Canvas;

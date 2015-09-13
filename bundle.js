/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	    var a = document.getElementById('canvas-surface');

	    var core = __webpack_require__(1);

	    var core = new VR8.Core(true);
	    var buffer = new VR8.Buffer();
	    var shader = new VR8.Shader();
	    var camera = VR8.Camera.MakeOrtho(0, 50, 50, 0, 1, -1);
	    var scene = new VR8.Scene2D({
	        clear: {
	            r: 1,
	            g: 1,
	            b: 1
	        }
	    });





/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var VR8 = VR8 || {};

	VR8.Core = function(fullscreen, el) {
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

	VR8.Extend = function(obj, prop) {
	    var proto = obj.prototype;

	    for (var keys in prop) {
	        proto[keys] = prop[keys];
	    }
	}



	VR8.Scene2D = function() {

	    var Width = VR8.W;
	    var Height = VR8.H;
	    var gl = VR8.webGL;
	    this.shader = {};
	    this.camera = {};
	    var options = options || {};

	    gl.viewport(0, 0, Width, Height);
	    
	    gl.clearColor(0.0, 0.0, 0.0, 1.0);


	    /* this method can be override for custom functionality. */

	    this.setClearColor = function(clear){
	        gl.clearColor(clear.r , clear.g , clear.b, 1.0);
	    }

	    this.clean = function() {
	        gl.clear(gl.COLOR_BUFFER_BIT);
	    }

	    this.prepare = function(entity) {
	        this.shader.prepare({
	            'MV': this.camera,
	            'P': entity.model
	        });

	        gl.bindBuffer(gl.ARRAY_BUFFER, entity.buffer.buffer);

	        entity.buffer.upload_vertex(this.shader.vars.position);
	        entity.buffer.upload_texture(this.shader.vars.texture);
	        entity.buffer.upload_colors(this.shader.vars.colors);

	        if (entity.texture)
	            entity.texture.prepare(this.shader.vars);

	    }

	    this.draw = function(entity) {
	        if (typeof gl[entity.drawType] === 'number')
	            gl.drawArrays(gl[entity.drawType], 0, entity.buffer.sides);
	        else
	            gl.drawArrays(gl.TRIANGLE_STRIP, 0, entity.buffer.sides);
	    }

	    this.render = function(e) {
	        this.prepare(e);
	        this.draw(e);
	    }
	}

	modules.exports = Core;


/***/ }
/******/ ]);
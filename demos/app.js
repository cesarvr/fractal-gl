'use strict';
var DIR = '../js/vr8/';

var Core    = require('../js/vr8/core');
var Buffer  = require('../js/vr8/buffer');
var Shader  = require('../js/vr8/shader');
var Texture = require('../js/vr8/texture');
var Camera  = require('../js/vr8/camera');
var Scene   = require('../js/vr8/scene');

var core = new Core(true, document.getElementById('webgl-div'));

var webGL   = core.getWebGL();
var buffer  = Buffer.New(webGL);
var shader  = Shader.New(webGL);
var texture = Texture.New(webGL); 

var scene  = Scene.New(webGL);
var camera = Camera.New();


/* config */
var cameraMtx = camera.MakeOrtho(0, 50, 50, 0, 1, -1);

scene.setViewPort(core.canvas.x, core.canvas.y);



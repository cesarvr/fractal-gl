'use strict';



var Core = function(options) {
    var CanvasGL = require('./canvas');

    this.Buffer = require('./buffer');
    this.Shader = require('./shader');
    this.Texture = require('./texture');
    this.Camera = require('./camera');
    this.Scene = require('./scene');
    this.Geometry = require('./geometry');

    var core = new CanvasGL(options.fullscreen, options.element);
    var webGL = core.getWebGL();


    this.canvas = core.canvas;
    this.createBuffer = function() {
        return this.Buffer.New(webGL);
    };

    this.createShader = function() {
        return this.Shader.New(webGL);
    };

    this.createTexture = function() {
        return this.Texture.New(webGL);
    };

    this.createScene = function() {
        return this.Scene.New(webGL);
    };

    this.createGeometry = function() {
        return this.Geometry.New();
    };

    this.getUtils = function() {
        return {
            camera: this.Camera.New(),
            util: require('../utils/util').New()
        };
    };


    this.MLib = {
        Vec3: require('../mathv2/vector').Vec3,
        Vec4: require('../mathv2/vector').Vec4,
        Mat4: require('../mathv2/matrix'),
        Transform: require('../mathv2/transform'),
    };
};






module.exports = Core;

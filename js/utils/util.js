'use strict'

var Factory = require('../utils/factory');

var Utils = function() {

    /* loading HTML5 rendering API */
    this.getNextFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    }());

    /*
     *  Fetch: this class load all the maps async.
     */
    this.Fetch = function(images, callback) {
        var imgObjects = [];
        images.forEach(function(image) {
            var img = new Image();
            img.onload = function() {
                imgObjects.push(img);
                if (imgObjects.length === images.length)
                    callback(imgObjects);
            }
            img.src = image;
        });
    };

    this.getCode = function(EL, from) {
        return EL.querySelector(from).innerHTML;
    };


    this.loadShader = function(tmpl) {
        var el = document.createElement('div');
        el.innerHTML = tmpl;
        return el;
    };

    this.getshaderUsingTemplate = function(tmpl) {
        var EL = this.loadShader(tmpl);
        var shader = {};

        shader.vertex = this.getCode(EL, '#vertex-shader');
        shader.fragment = this.getCode(EL, '#fragment-shader');

        shader.init = function(shader) {
            shader.use();
            shader
                .attribute('position')
                .attribute('texture')
                .attribute('colors')
                .uniform('MV')
                .uniform('uSampler')
                .uniform('P');
        }

        return shader;
    };
}



module.exports = new Factory(Utils);

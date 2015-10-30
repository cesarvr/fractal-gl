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
    }

    this.ShaderUtil = require('./shader');

}



module.exports = new Factory(Utils);


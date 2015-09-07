window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();



VR8.Utils = {};
VR8.Utils.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


VR8.Utils.Extend = function(obj, clazz) {

    var proto = obj.prototype;

    for (var keys in clazz) {
        proto[keys] = clazz[keys];
    }
}




/*
 *  Fetch: this class load all the maps async.
 */
var Fetch = function(images, callback) {
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


VR8.Utils.Assets = {};
VR8.Utils.Assets.Fetch = Fetch;

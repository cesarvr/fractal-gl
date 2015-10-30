var Vec4 = require('./vector').Vec4;
var Mat4 = require('./matrix');


var Transform = function(m) {
    var _m = m;

    this.translate = function(x, y, z) {
        _m.row1.w = x || 0.0;
        _m.row2.w = y || 0.0;
        _m.row3.w = z || 0.0;
        return this;
    };

    this.scale = function(x, y, z) {
        _m.row1.x = x || 0.0;
        _m.row2.y = y || 0.0;
        _m.row3.z = z || 0.0;
        return this;
    };

    this.getMatrix = function(){
      return _m.getMatrix();
    }; 

};

module.exports = {
    Apply: function(m) {
        return new Transform(m);
    },
    New: function(){
      return new Transform( Mat4.Identity() );
    },
};

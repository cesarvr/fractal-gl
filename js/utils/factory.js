'use strict';
var Factory = function(_Object){

    this.New = function(core) {
        return new _Object(core, {});
    };

    this.Extend = function(core, that) {
        return _Object(core, that);
    };
};

module.exports = Factory;

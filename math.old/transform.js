VR8.Camera = VR8.Camera || {};

/*
 * [ 0 4  8 12 ]   [ 0 4  8 12 ]
 * [ 1 5  9 13 ] x [ 1 5  9 13 ]
 * [ 2 6 10 14 ]   [ 2 6 10 14 ]
 * [ 3 7 11 15 ]   [ 3 7 11 15 ]
 *
 *
 * */

VR8.Transform = function(_m) {
    var _mm = Math;
    var mtx = _m ? _m.m() : new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
    this.m = mtx;


    var _toRad = function(angle) {
        return angle * _mm.PI / 180;
    }

    /* vector version */
    this.translatev = function(vec) {
        var v = vec.v;
        this.translate(v[0], v[1], v[2]);
        return this;
    };


    /* non-vector version */
    this.scale = function(x, y, z) {
        mtx[0] = x;
        mtx[5] = y;
        mtx[10] = z;
        return this;
    };

    this.translate = function(x, y, z) {
        mtx[12] = x;
        mtx[13] = y;
        mtx[14] = z;
        return this;
    };

    this.rotateX = function(angle) {
        var radian = _toRad(angle);
        
        mtx[5] = _mm.cos(radian);
        mtx[9] = -_mm.sin(radian);
        mtx[6] = _mm.sin(radian);
        mtx[10] = _mm.cos(radian);
        
        return this;
    };

    this.rotateY = function(angle) {
        var radian = _toRad(angle);
        
        mtx[0] = _mm.cos(radian);
        mtx[8] = -_mm.sin(radian);
        mtx[2] = _mm.sin(radian);
        mtx[10] = _mm.cos(radian);
        return this;
    };

    this.rotateZ = function(angle) {
        var radian = _toRad(angle);
        
        mtx[0] = _mm.cos(radian);
        mtx[4] = _mm.sin(radian);
        mtx[1] = -_mm.sin(radian);
        mtx[5] = _mm.cos(radian);
        return this;
    };
}

VR8.Camera.MakeOrtho = function(left, right, bottom, top, nearz, farz) {
    var m = new Float32Array(16);

    m[1] = m[2] = m[3] = m[4] = m[6] = m[7] = m[8] = m[9] = m[11] = 0.0;

    m[0] = 2.0 / (right - left);
    m[5] = 2.0 / (top - bottom)
    m[12] = -(right + left) / (right - left);
    m[13] = -(top + bottom) / (top - bottom);
    m[14] = -(farz + nearz) / (farz - nearz);
    m[15] = 1.0;
    return m;
}

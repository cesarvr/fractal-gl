var Vec4 = require('./vector').Vec4;


/*
 * [ 0 4  8 12 ]   [ 0 4  8 12 ]
 * [ 1 5  9 13 ] x [ 1 5  9 13 ]
 * [ 2 6 10 14 ]   [ 2 6 10 14 ]
 * [ 3 7 11 15 ]   [ 3 7 11 15 ]
 *
 *
 * */


function p(m) {

    console.log('Matrix4:Debug');

    var a = m.row1;
    console.log(a.x, a.y, a.z, a.w);

    var a = m.row2;
    console.log(a.x, a.y, a.z, a.w);

    var a = m.row3;
    console.log(a.x, a.y, a.z, a.w);

    var a = m.row4;
    console.log(a.x, a.y, a.z, a.w);
}



var Matrix4 = function() {

    this.row1 = Vec4.New();
    this.row2 = Vec4.New();
    this.row3 = Vec4.New();
    this.row4 = Vec4.New();

    /*
     * [ 0 4  8 12 ] 
     * [ 1 5  9 13 ]
     * [ 2 6 10 14 ]  
     * [ 3 7 11 15 ] 
     *
     * */

    this.getMatrix = function() {
        return new Float32Array(
          [ this.row1.x, this.row2.x, this.row3.x, this.row4.x,
            this.row1.y, this.row2.y, this.row3.y, this.row4.y,
            this.row1.z, this.row2.z, this.row3.z, this.row4.z,
            this.row1.w, this.row2.w, this.row3.w, this.row4.w ]);
    };

    this.setIdentity = function() {
        this.row1 = Vec4.New(1.0, 0.0, 0.0, 0.0);
        this.row2 = Vec4.New(0.0, 1.0, 0.0, 0.0);
        this.row3 = Vec4.New(0.0, 0.0, 1.0, 0.0);
        this.row4 = Vec4.New(0.0, 0.0, 0.0, 1.0);
    };

    this.setMatrix = function(m) {
        this.row1 = m.row1;
        this.row2 = m.row2;
        this.row3 = m.row3;
        this.row4 = m.row4;
    };

    this.set = function(r1, r2, r3, r4) {
        this.row1 = r1;
        this.row2 = r2;
        this.row3 = r3;
        this.row4 = r4;
    };

    this.getTransponse = function() {
        var mtx = MatrixFactory.New();
        mtx.row1.set(this.row1.x, this.row2.x, this.row3.x, this.row4.x);
        mtx.row2.set(this.row1.y, this.row2.y, this.row3.y, this.row4.y);
        mtx.row3.set(this.row1.z, this.row2.z, this.row3.z, this.row4.z);
        mtx.row4.set(this.row1.w, this.row2.w, this.row3.w, this.row4.w);
        return mtx;
    };

    this.multiply = function(m) {
        var mtx = MatrixFactory.New();
        var rhs = m.getTransponse();

        mtx.row1.set(
            this.row1.dot(rhs.row1),
            this.row1.dot(rhs.row2),
            this.row1.dot(rhs.row3),
            this.row1.dot(rhs.row4));

        mtx.row2.set(
            this.row2.dot(rhs.row1),
            this.row2.dot(rhs.row2),
            this.row2.dot(rhs.row3),
            this.row2.dot(rhs.row4));

        mtx.row3.set(
            this.row3.dot(rhs.row1),
            this.row3.dot(rhs.row2),
            this.row3.dot(rhs.row3),
            this.row3.dot(rhs.row4));

        mtx.row4.set(
            this.row4.dot(rhs.row1),
            this.row4.dot(rhs.row2),
            this.row4.dot(rhs.row3),
            this.row4.dot(rhs.row4));

        this.setMatrix(mtx);
    };
};


var MatrixFactory = {

    New: function() {
        return new Matrix4();
    },

    Identity: function() {
        var o = new Matrix4();
        o.setIdentity();
        return o;
    },
};

module.exports = MatrixFactory;

var Vec4 = require('./vector').Vec4;


/*
 * [ 0 4  8 12 ]   [ 0 4  8 12 ]
 * [ 1 5  9 13 ] x [ 1 5  9 13 ]
 * [ 2 6 10 14 ]   [ 2 6 10 14 ]
 * [ 3 7 11 15 ]   [ 3 7 11 15 ]
 *
 *
 * */


    function p(m){
    
        console.log('Matrix4:Debug');

        var a = m.row1;
        console.log(a.x , a.y, a.z, a.w);

        var a = m.row2;
        console.log(a.x , a.y, a.z, a.w);
      
        var a = m.row3;
        console.log(a.x , a.y, a.z, a.w);

        var a = m.row4;
        console.log(a.x , a.y, a.z, a.w);
    }



var Matrix4 = {

    row1: Vec4.New(),
    row2: Vec4.New(),
    row3: Vec4.New(),
    row4: Vec4.New(),

    setIdentity: function() {
        this.row1 = Vec4.New(1.0, 0.0, 0.0, 0.0);
        this.row2 = Vec4.New(0.0, 1.0, 0.0, 0.0);
        this.row3 = Vec4.New(0.0, 0.0, 1.0, 0.0);
        this.row4 = Vec4.New(0.0, 0.0, 0.0, 1.0);
    },

    getTransponse: function() {
        var mtx = Object.create(Matrix4);
        mtx.row1.set(this.row1.x, this.row2.x, this.row3.x, this.row4.x);
        mtx.row2.set(this.row1.y, this.row2.y, this.row3.y, this.row4.y);
        mtx.row3.set(this.row1.z, this.row2.z, this.row3.z, this.row4.z);
        mtx.row4.set(this.row1.w, this.row2.w, this.row3.w, this.row4.w);
        return mtx;
    },

    multiply: function(m) {
        var mtx = Object.create(Matrix4);
        var rhs = m.getTransponse();

        console.log('before');
        p(this);


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

        p(mtx);
        
        this.row1 = mtx.row1;
        this.row2 = mtx.row2;
        this.row3 = mtx.row3;
        this.row4 = mtx.row4;

    },


};

module.exports = {

    New: function() {
        return Object.create(Matrix4);
    },

    Identity: function() {
        var o = Object.create(Matrix4);
        o.setIdentity();
        return o;
    },
};

/*
 * [ 0 4  8 12 ]   [ 0 4  8 12 ]
 * [ 1 5  9 13 ] x [ 1 5  9 13 ]
 * [ 2 6 10 14 ]   [ 2 6 10 14 ]
 * [ 3 7 11 15 ]   [ 3 7 11 15 ]
 *
 *
 * */


var czmath = czmath || {};

czmath.matrix4 = function(m){

  var _m = typeof m === 'object'?new Float32Array(m):{};
  var zero = function(){
    return new Float32Array([
      0.0,0.0,0.0,0.0,
      0.0,0.0,0.0,0.0,
      0.0,0.0,0.0,0.0,
      0.0,0.0,0.0,0.0
    ]);
  };

  var identity = function(){
    return new Float32Array([
      1.0,0.0,0.0,0.0,
      0.0,1.0,0.0,0.0,
      0.0,0.0,1.0,0.0,
      0.0,0.0,0.0,1.0
    ]);
  };

  return {
    set_identity:function(){
      _m = identity();
      return this;
    },

    touch: function(list, values){
      if(list.length !== values.length) 
        throw 'illegal sizesi';
      for(var i in list)
        _m[ list[i] ] = values[i];
      return this;
    },

    set_zero: function(){
      _m = zero();
      return this;
    },

    set_val: function(i, val){
      _m[i] = val;	
    },

    set: function(m){
      _m = m;
    },

    m: function(){
      return _m;
    },

    add: function(){

    },
    
    mult: function(mat){
     _m = this.multiply(mat);
      return this;
    },  

    multiply: function(mat){
      if(typeof mat.m !== 'function')
        throw 'czmath.matrix4 needed'; 

      var m1 = mat.m();
      var result = new Float32Array(16);

      result[0] = _m[0]*m1[0] + _m[4]*m1[1] + _m[8]*m1[2] +  _m[12]*m1[3]; 
      result[1] = _m[1]*m1[0] + _m[5]*m1[1] + _m[9]*m1[2] +  _m[13]*m1[3];
      result[2] = _m[2]*m1[0] + _m[6]*m1[1] + _m[10]*m1[2] + _m[14]*m1[3];
      result[3] = _m[3]*m1[0] + _m[7]*m1[1] + _m[11]*m1[2] + _m[15]*m1[3];

      result[4] = _m[0]*m1[4] + _m[4]*m1[5] + _m[8]*m1[6] +  _m[12]*m1[7]; 
      result[5] = _m[1]*m1[4] + _m[5]*m1[5] + _m[9]*m1[6] +  _m[13]*m1[7];
      result[6] = _m[2]*m1[4] + _m[6]*m1[5] + _m[10]*m1[6] + _m[14]*m1[7];
      result[7] = _m[3]*m1[4] + _m[7]*m1[5] + _m[11]*m1[6] + _m[15]*m1[7];

      result[8]  = _m[0]*m1[8] + _m[4]*m1[9] + _m[8]*m1[10] +  _m[12]*m1[11]; 
      result[9]  = _m[1]*m1[8] + _m[5]*m1[9] + _m[9]*m1[10] +  _m[13]*m1[11];
      result[10] = _m[2]*m1[8] + _m[6]*m1[9] + _m[10]*m1[10] + _m[14]*m1[11];
      result[11] = _m[3]*m1[8] + _m[7]*m1[9] + _m[11]*m1[10] + _m[15]*m1[11];


      result[12] = _m[0]*m1[12] + _m[4]*m1[13] + _m[8]*m1[14] +  _m[12]*m1[15]; 
      result[13] = _m[1]*m1[12] + _m[5]*m1[13] + _m[9]*m1[14] +  _m[13]*m1[15];
      result[14] = _m[2]*m1[12] + _m[6]*m1[13] + _m[10]*m1[14] + _m[14]*m1[15];
      result[15] = _m[3]*m1[12] + _m[7]*m1[13] + _m[11]*m1[14] + _m[15]*m1[15];

      return result;

    }
  };
}


/*
 * [ 0 4  8 12 ]   [ 0 4  8 12 ]
 * [ 1 5  9 13 ] x [ 1 5  9 13 ]
 * [ 2 6 10 14 ]   [ 2 6 10 14 ]
 * [ 3 7 11 15 ]   [ 3 7 11 15 ]
 *
 *
 * */

czmath.transform = {
  _mm: Math,
  ortho: function(left, right, 
                  bottom, top, 
                  nearz, farz  ){

    var m = new Float32Array(16); 
    
    m[1] = m[2] = m[3] = m[4] = m[6] 
      = m[7]=m[8]=m[9]=m[11] = 0.0;

    m[0] = 2.0 / (right - left ); 
    m[5] = 2.0 / (top - bottom)
    m[12] = -(right + left) / (right - left);
    m[13] = -(top + bottom) / (top - bottom);
    m[14] = -(farz + nearz) / (farz - nearz);
    m[15] = 1.0;
    return m;
  },

  scaling: function(x,y,z){
    var mat4 = new czmath.matrix4();
    mat4.set_identity().touch([0,5,10], [x,y,z]);
    return mat4;
  },
  
  translate: function(x,y,z){
    var mat4 = new czmath.matrix4().set_identity();
    return mat4.touch([12,13,14], [x,y,z]);
  },

  rotate_x: function(a){
    var mat4 = new czmath.matrix4();

    mat4.set_identity().
      touch([10,14,11,15],[_mm.cos(a),-_mm.sin(a),
                              _mm.sin(a), _mm.cos(a) ]);
    return mat4;
  },

  rotate_y: function(a){
    var mat4 = new czmath.matrix4();

    mat4.set_identity().
      touch([0,8,2,10],[_mm.cos(a),_mm.sin(a),
                          -_mm.sin(a), _mm.cos(a) ]);
    return mat4;
  },

  rotate_z: function(a){
    var mat4 = new czmath.matrix4();

    mat4.set_identity().
      touch([0,1,4,5],[_mm.cos(a),-_mm.sin(a),
                        _mm.sin(a), _mm.cos(a) ]);
    return mat4;
  }
};

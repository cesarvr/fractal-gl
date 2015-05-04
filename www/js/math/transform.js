/*
 * [ 0 4  8 12 ]   [ 0 4  8 12 ]
 * [ 1 5  9 13 ] x [ 1 5  9 13 ]
 * [ 2 6 10 14 ]   [ 2 6 10 14 ]
 * [ 3 7 11 15 ]   [ 3 7 11 15 ]
 *
 *
 * */

VR8.transform = {
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
    var mat4 = new VR8.Matrix4();
    mat4.set_identity().touch([0,5,10], [x,y,z]);
    return mat4;
  },
  
  translate: function(x,y,z){
    var mat4 = new VR8.Matrix4().set_identity();
    return mat4.touch([12,13,14], [x,y,z]);
  },

  rotate_x: function(a){
    var mat4 = new VR8.Matrix4();
    var _mm = this._mm;
    mat4.set_identity().
      touch([10,14,11,15],[_mm.cos(a),-_mm.sin(a),
                              _mm.sin(a), _mm.cos(a) ]);
    return mat4;
  },

  rotate_y: function(a){
    var mat4 = new VR8.Matrix4();

    mat4.set_identity().
      touch([0,8,2,10],[_mm.cos(a),_mm.sin(a),
                          -_mm.sin(a), _mm.cos(a) ]);
    return mat4;
  },

  rotate_z: function(a){
    var mat4 = new VR8.Matrix4();

    mat4.set_identity().
      touch([0,1,4,5],[_mm.cos(a),-_mm.sin(a),
                        _mm.sin(a), _mm.cos(a) ]);
    return mat4;
  }
};

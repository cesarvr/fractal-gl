var VR8 = VR8 || {}; 
var Vector = function(x,y,z){
  
  var val = new Float32Array([x,y,z]);
  
  this.v = val; 

  this.get = function(){ return val};

  this.set= function(x, y, z){
    val[0] = x; 
    val[1] = y;
    val[2] = z;
    return this;
  }
  
  this.add= function(v){
    val[0] += v.v[0];
    val[1] += v.v[1];
    val[2] += v.v[2];
    return this;
  }

  this.sub= function(v){
    val[0] -= v.v[0];
    val[1] -= v.v[1];
    val[2] -= v.v[2];
    return this;
  }

  this.dot = function(v){
    return (val[0] * v.v[0]) + (val[1] * v.v[1]) + (val[2] * v.v[2]) 
  }

  this.invert= function(){
    for(var i in val)
      val[i] = -val[i];
    return this;
  }

  this.magnitude= function(){
    var v = val;
    return Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
  }

  this.normalize= function(){
    var m = this.magnitude(); 
    var tmp = new Vector( val[0] / m,
                          val[1] / m,
                          val[2] / m);

    return tmp;
  }
  
  this.scalar_mul= function(e){
    val[0] *= e; 
    val[1] *= e; 
    val[2] *= e;
    return this;
  }
  
  this.cross = function(v){
    return new vtor(
      val[1] * v.v[2] - val[2] * v.v[1],
      val[2] * v.v[0] - val[0] * v.v[2],
      val[0] * v.v[1] - val[1] * v.v[0]
    );
  }

  this.crossMe = function(v){
   // this = cross(v);
  }

}

VR8.Lerp = function(v0, v1, t){
    v0.scalar_mul(1.0-t).add(v1.scalar_mul(t));   
}





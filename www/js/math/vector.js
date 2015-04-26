var Vector = function(x,y,z){
  
  var val = new Float32Array([x,y,z]);
  
  this.vec = val; 

  this.get = function(){ return val};

  this.set= function(x, y, z){
    val[0] = x; 
    val[1] = y;
    val[2] = z;
    return this;
  }
  
  this.add= function(v){
    val[0] += v.vec[0];
    val[1] += v.vec[1];
    val[2] += v.vec[2];
    return this;
  }

  this.sub= function(v){
    val[0] -= v.vec[0];
    val[1] -= v.vec[1];
    val[2] -= v.vec[2];
    return this;
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
    val[0] = val[0] / m; 
    val[1] = val[1] / m; 
    val[2] = val[2] / m;
    return this;
  }
  
  this.scalar_mul= function(e){
    val[0] *= e; 
    val[1] *= e; 
    val[2] *= e;
    return this;
  }
  
  this.cross = function(v){
    return new Vector(
      val[1] * v.vec[2] - val[2] * v.vec[1],
      val[2] * v.vec[0] - val[0] * v.vec[2],
      val[0] * v.vec[1] - val[1] * v.vec[0]
    );
  }

  this.crossMe = function(v){
   // this = cross(v);
  }


}

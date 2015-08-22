VR8.geometry = VR8.geometry || {}; 

VR8.geometry.vec_maker  = function(vector){
      var buff = new Float32Array(7);
      if(typeof vector.pos !== 'undefined'){
        buff.set(vector.pos.get(), 0);
      }else
          throw 'missing vector3 for position.';
      
      if(typeof vector.color !== 'undefined') { 
        var c = new Float32Array(4);
        c.set(vector.color.get());
        c[3]= 0.7;
        buff.set(c, 3); 
      }else
        buff.set([0.7,0.7,0.7,0.7], 3); //set to white as default.
      return buff;
}

VR8.geometry.mesh = function(size){
    var buffer = new Float32Array(size);
    var counter = 0, step=7;
    var len = 0;
    var load = VR8.geometry.vec_maker; 
    return {
        buffer: function(){ return buffer.subarray(0, len); },
        add:function(p,c){
            len+=step;
            buffer.set( load({pos:p, color: c}), counter );
            counter+=step;
        }
    }
};

VR8.geometry.shape = function(position, color){
    var vec = new Float32Array(7);
    vec.set(position.v,0);
    vec.set(color.v, 3);
    return vec;
}


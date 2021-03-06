var VR8 = VR8 || {};
var Vector = function(opt) {

    var val
    if (opt instanceof Array || opt instanceof Float32Array) {
        val = opt;
    }else if(opt instanceof Vector){
       val = opt.v;
    } else {
        val = new Float32Array([opt.x, opt.y, opt.z]);
    }

    this.v = val;

    this.get = function() {
        return val
    };

    this.setX = function(n) {
        val[0] = n;
        return this;
    };

    this.setY = function(n) {
        val[1] = n;
        return this;
    };

    this.setZ = function(n) {
        val[2] = n;
        return this;
    };

    this.getX = function() {
        return val[0];
    };

    this.getY = function() {
        return val[1];
    };

    this.getZ = function() {
        return val[2];
    };

    this.set = function(x, y, z) {
        val[0] = x;
        val[1] = y;
        val[2] = z;
        return this;
    };

    this.add = function(v) {
        val[0] += v.v[0];
        val[1] += v.v[1];
        val[2] += v.v[2];
        return this;
    };

    this.sub = function(v) {
        val[0] -= v.v[0];
        val[1] -= v.v[1];
        val[2] -= v.v[2];
        return this;
    };

    this.dot = function(v) {
        return (val[0] * v.v[0]) + (val[1] * v.v[1]) + (val[2] * v.v[2])
    };

    this.invert = function() {
        for (var i in val)
            val[i] = -val[i];
        return this;
    };

    this.magnitude = function() {
        var v = val;
        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    };

    this.normalize = function() {
        var m = this.magnitude();
        var tmp = new Vector(val[0] / m,
            val[1] / m,
            val[2] / m);

        return tmp;
    };

    this.scalar_mul = function(e) {
        val[0] *= e;
        val[1] *= e;
        val[2] *= e;
        return this;
    };

    this.multiplyByScalar = function(scalar) {
        return new Vector([val[0] * scalar, val[1] * scalar, val[2] * scalar]);
    };

    this.cross = function(v) {
        return new vtor(
            val[1] * v.v[2] - val[2] * v.v[1],
            val[2] * v.v[0] - val[0] * v.v[2],
            val[0] * v.v[1] - val[1] * v.v[0]
        );
    };

    this.copy = function() {
        
        return new Vector([val[0], val[1], val[2]]);
    }

    this.crossMe = function(v) {
        // this = cross(v);
    };

    this.project = function(b) {
        var ab = this.dot(b);
        var proj = ab / b.magnitude();
        var vnorm = b.normalize();
        return vnorm.multiplyByScalar(proj);
    };

};

var Vector4 = function(x, y, z, w) {
    this.v = new Float32Array([x, y, z, w]);
}


VR8.Lerp = function(v0, v1, t) {
   return  v0.scalar_mul(1.0 - t).add(v1.multiplyByScalar(t));
}

VR8.CosLerp = function(v0, v1, t){
 var ft = t * Math.PI; 
 var f  = (1 - Math.cos(ft)) * .5; 
   return  v0.scalar_mul(1.0 - f).add(v1.multiplyByScalar(f));
}







var v3 = function() {};

v3.deg_rad = function(angle) {
    return angle * Math.PI / 180;
};

v3.add_scalar = function(v, scalar) {
    return new Float32Array([v[0] + scalar, v[1] + scalar, v[2] + scalar]);
};

v3.sub_scalar = function(v, scalar) {
    return new Float32Array([v[0] - scalar, v[1] - scalar, v[2] - scalar]);
};

v3.mul_scalar = function(v, scalar) {
    return new Float32Array([v[0] * scalar, v[1] * scalar, v[2] * scalar]);
};

v3.div_scalar = function(v, scalar) {
    return new Float32Array([v[0] / scalar, v[1] / scalar, v[2] / scalar]);
};

v3.add = function(v1, v2) {
    return new Float32Array([v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]);
};

v3.sub = function(v1, v2) {
    return new Float32Array([v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]]);
};

v3.mul = function(v1, v2) {
    return new Float32Array([v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2]]);
};

v3.len = function(v) {
    return Math.sqrt(((v[0] * v[0]) + (v[1] * v[1]) + (v[2] * v[2])));
};

v3.normalize = function(v) {
    var n = this.len(v);
    return new Float32Array([v[0] / n, v[1] / n, v[2] / n]);
};

v3.lerp = function(v1, v2, t) {
    //v0.alar_mul(1.0 - t).add(v1.multiplyByScalar(t));
    return v3.add(v3.mul_scalar(v1, 1.0 - t), v3.mul_scalar(v2, t));
};

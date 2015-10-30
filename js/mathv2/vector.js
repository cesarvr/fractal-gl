var Vector3 = function(x, y, z) {
    this.x = x || 0.0;
    this.y = y || 0.0;
    this.z = z || 0.0;

    this.setX = function(n) {
        this.x = n;
        return this;
    };

    this.setY = function(n) {
        this.y = n;
        return this;
    };

    this.setZ = function(n) {
        this.z = n;
        return this;
    };

    this.getX = function() {
        return this.x;
    };

    this.getY = function() {
        return this.y;
    };

    this.getZ = function() {
        return this.z;
    };

    this.set = function(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;

        return this;
    };

    this.add = function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
    };

    this.sub = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    };

    this.dot = function(v) {
        return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
    };

    this.invert = function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;

        return this;
    };

    this.magnitude = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };

    this.len = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };

    this.normalize = function() {
        var m = this.magnitude();
        var tmp = new Vector3(
            this.x / m,
            this.y / m,
            this.z / m);

        return tmp;
    };

    this.norm = function() {
        var m = this.magnitude();
        var tmp = new Vector3(
            this.x / m,
            this.y / m,
            this.z / m);

        return tmp;
    };

    this.scalarMult = function(e) {
        this.x *= e;
        this.y *= e;
        this.z *= e;
        return this;
    };

    this.multiplyByScalar = function(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    };

    this.cross = function(v) {
        return new Vector3((this.y * v.z - this.z * v.y), (this.z * v.x - this.x * v.z), (this.x * v.y - this.y * v.x));
    };

    this.copy = function() {
        return new Vector3(this.x, this.y, this.z);
    };

    this.project = function(b) {
        var ab = this.dot(b);
        var proj = ab / b.magnitude();
        var vnorm = b.normalize();
        return vnorm.multiplyByScalar(proj);
    };
};

var Vector4 = function(x, y, z, w) {
    this.x = x || 0.0;
    this.y = y || 0.0;
    this.z = z || 0.0;
    this.w = w || 0.0;

    this.set = function(x, y, z, w) {
        this.x = x || 0.0;
        this.y = y || 0.0;
        this.z = z || 0.0;
        this.w = w || 0.0;


    };

    this.dot = function(v) {
        return (this.x * v.x) + (this.y * v.y) + (this.z * v.z) + (this.w * v.w);
    };

    this.add = function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;

        return this;
    };

    this.sub = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;

        return this;
    };
};



var LerpFn = {

    Lerp: function(v0, v1, t) {
        return v0.scalar_mul(1.0 - t).add(v1.multiplyByScalar(t));
    },

    CosLerp: function(v0, v1, t) {
        var ft = t * Math.PI;
        var f = (1 - Math.cos(ft)) * .5;
        return v0.scalar_mul(1.0 - f).add(v1.multiplyByScalar(f));
    },
};





/* functional version */

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

module.exports = {

    Vec3: {
        New: function(x, y, z) {
            return new Vector3(x, y, z);
        }
    },

    Vec4: {
        New: function(x, y, z, w) {
            return new Vector4(x, y, z, w);
        }
    },

    Vec3Fn: v3,
    Lerp: LerpFn,
};

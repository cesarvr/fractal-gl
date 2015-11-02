var Noise = function() {

    this.cosineInterpolation = function(x1, x2, t) {
        var fnt = t * Math.PI;
        var f = (1 - Math.cos(fnt)) * 0.5;
        return x1 * (1 - f) + x2 * f;
    };


    var rand = function(a, b) {
        var x = a + b * 57;
        x = (x << 13) ^ x;
        return (1 - ((x * (x * x * 19417 + 189851) + 4967243) & 4945007) / 3354521.0);
    }

    var rand3 = function(min, max) {
        return Math.random() * (max - min) + min;
    }

/*
    var rand = function() {
        var mp = [];
        for (var a = 0; a < 4000000; a++) {
            mp.push(rand3(-1, 1));
        }

        return function(a, b) {
            return mp[a] + mp[b];
        }
    }();
*/

    /* generate random number between -1 and 1 */
    var rand2 = function() {
        return (Math.random() * (0 - 2) + 1)
    }

    var takeDecimal = function(n) {
        return n - Math.round(n);
    }

    this.mnoise = function(x, y) {
        var intX = Math.round(x);
        var intY = Math.round(y);
        var fracX = takeDecimal(x);
        var fracY = takeDecimal(y);

        var v1, v2, v3, v4;

        v1 = rand(x, y);
        v2 = rand(x + 1, y);
        v3 = rand(x, y + 1);
        v4 = rand(x + 1, y + 1);

        var i1 = this.cosineInterpolation(v1, v2, fracX);
        var i2 = this.cosineInterpolation(v3, v4, fracX);

        return this.cosineInterpolation(i1, i2, fracY);
    };


    this.makeNoise = function(x, y, octaves, amplitude, frecuency, h) {
        var ret = 0;
        for (var i = 0; i < (octaves - 1); i++) {
            ret += this.mnoise(x * frecuency, y * frecuency) * amplitude;
            amplitude *= h;
        }

        //  if(ret > 12) debugger;

        return ret;
    };


};



module.exports = Noise;

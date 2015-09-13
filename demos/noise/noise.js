'use strict';
(function() {

    var texture = function(textureSize) {

        var pix = [];

        for (var x = 0; x < textureSize; x++) {
            for (var y = 0; y < textureSize; y++) {
                var xor = x ^ y;
                pix.push(xor) // r
                pix.push(xor) // g
                pix.push(xor) // b 
            }
        }
        return pix;
    };



    var perlin = function(textureSize) {
        var noise = noise_generate(textureSize);
        var perlin = [];
        for (var x = 0; x < textureSize; x++) {
            for (var y = 0; y < textureSize; y++) {

                var color = smooth(x/16, y/16, textureSize, noise);

                perlin.push(color);
                perlin.push(color);
                perlin.push(color);
            }
        }
        return perlin;
    };

    
    var turbulence = function(x,y,size, textureSize, noise){
        var value = 0.0, init = size;
        while(size >= 1){
            value += smooth((x / size), (y / size), textureSize, noise) * size;
            size /=2.0;
        }

        return (128.0 * value / init);
    };

    var noise_generate = function(textureSize) {
        var pix = [];

        for (var x = 0; x < textureSize; x++) {
            for (var y = 0; y < textureSize; y++) {

                var color = Math.random() * 256;
                pix.push(color) // r
                pix.push(color) // g
                pix.push(color) // b 

            }
        }
        return pix;

    };



    var smooth = function(x, y, textureSize, noise) {

        var ix = Math.round(x);
        var iy = Math.round(y);

        var fx = ix - x;
        var fy = iy - y;

        var x1 = (ix + textureSize) % textureSize;
        var y1 = (iy + textureSize) % textureSize;

        /* neighbor pixels */

        var x2 = (x1 + textureSize - 1) % textureSize;
        var y2 = (y1 + textureSize - 1) % textureSize;


        var value = 0.0;
        value += fx * fy * noise[x1 + (y1 * textureSize)];
        value += fx * (1 - fy) * noise[x1 + (y2 * textureSize)];

        value += (1 - fx) * fy * noise[x2 + (y1 * textureSize)];
        value += (1 - fx) * (1 - fy) * noise[x2 + (y2 * textureSize)];
        
        return value;
    };



    var prime = function(num) {

        var primes = [];
        for (var x = 3; x < num; x++) {
            var prime = true;
            for (var i = 2; i < x - 1; i++) {
                if ((x % i) === 0) {
                    prime = false;
                    break;
                }
            }

            if (prime) primes.push(x);
        }
        return primes;
    };


    self.importScripts('/js/thread/thread.js');
    Spawn.Thread({
        perlin: perlin,
        texture: texture,
        prime: prime
    });


}())

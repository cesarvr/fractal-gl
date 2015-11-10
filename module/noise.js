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
    SWorker.Thread({
        texture: texture,
        prime: prime
    });


}())

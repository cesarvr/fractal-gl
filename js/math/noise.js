var isPrime = function(num) {
    var iter = 0
    var show = function(iter, n) {
        console.log('iterations->', iter, ' divisor->', n, 'division->', num / n, '->num ', (num / n) * n);
    };
    var r = 0;
    for (r = 2; r < num; r++) {
        if ((num % r) === 0) {
            show(iter, r);
            return false;
        }
        iter++;
    }
    show(iter, r)
    return true;
}



var noise = function(x) {
    x = (x << 13) ^ x;
    return (1.0 - ((x * (x * x * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0);
}




module.exports = noise;

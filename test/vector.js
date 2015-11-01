var DIR = './js/mathv2/';
var assert = require('assert');
var vector = require('../vector');
var assert = require('chai').assert;

function pv(o) {
    console.log('\n x->', o.x, '\n y->', o.y, '\n z->', o.getZ(), '\n');
}

describe('Vector', function() {

    it('checking the packages', function() {
        assert.isObject(vector, 'Vector is an object');
        assert.isObject(vector.Vec3, 'Vec3 is an function');
        assert.isObject(vector.Vec4, 'Vec4 is an function');
        assert.isFunction(vector.Vec3Fn, 'Vec3Fn is an function');
        assert.isObject(vector.Lerp, 'Linear interpolation function is an object');
    });


    it('Vector # Add function', function() {
        var Vec3 = vector.Vec3;
        var a = Vec3.New(1, 2, 3);
        var b = Vec3.New(4, 4, 4);

        a.add(b);
        assert.strictEqual(a.x, 5, 'equal 5');
        assert.strictEqual(a.y, 6, 'equal 6');
        assert.strictEqual(a.z, 7, 'equal 7');
    });


    it('Vector # Sub function', function() {
        var Vec3 = vector.Vec3;
        var a = Vec3.New(4, 4, 4);
        var b = Vec3.New(4, 4, 5);

        a.sub(b);
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, -1, 'equal 1');
    });

    it('Vector # Dot function', function() {
        var Vec3 = vector.Vec3;
        var a = Vec3.New(1, 3, -5);
        var b = Vec3.New(4, -2, -1);

        var d = a.dot(b);
        assert.strictEqual(d, 3, 'equal 3');
    });

    it('Vector # Cross function', function() {
        var Vec3 = vector.Vec3;
        var a = Vec3.New(2, 3, 4);
        var b = Vec3.New(5, 6, 7);

        var z = a.cross(b);
        assert.strictEqual(z.x, -3, 'equal -3');
        assert.strictEqual(z.y, 6, 'equal 6');
        assert.strictEqual(z.z, -3, 'equal -3');
    });

    it('Vector # Len  function', function() {
        var Vec3 = vector.Vec3;
        var a = Vec3.New(2, 3, 4);
        var b = Vec3.New(5, 6, 7);

        var z = a.cross(b).len();

        assert.strictEqual(z, 7.3484692283495345, 'equal 7.3484692283495345');
    });

    it('Vector # Invert function', function() {
        var Vec3 = vector.Vec3;
        var a = Vec3.New(2, 3, 4);
        var b = Vec3.New(5, 6, 7);

        var z = a.cross(b).invert();
        assert.strictEqual(z.x, 3, 'equal 3');
        assert.strictEqual(z.y, -6, 'equal -6');
        assert.strictEqual(z.z, 3, 'equal 3');
    });

    it('Vector # Normalize function', function() {
        var Vec3 = vector.Vec3;
        var a = Vec3.New(2, 3, 4);
        var b = Vec3.New(5, 6, 7);

        var z = a.cross(b).norm();
        assert.strictEqual(z.x, -0.408248290463863 , 'equal -0.408248290463863');
        assert.strictEqual(z.y, 0.816496580927726, 'equal 0.816496580927726');
        assert.strictEqual(z.z,  -0.408248290463863 , 'equal -0.816496580927726');
    });


   it('Vector # MulScalar function', function() {
        var Vec3 = vector.Vec3;
        var a = Vec3.New(2, 3, 4);
        var b = Vec3.New(5, 6, 7);

        var z = a.cross(b).invert().scalarMult(2);
        assert.strictEqual(z.x, 6, 'equal 6');
        assert.strictEqual(z.y, -12, 'equal -12');
        assert.strictEqual(z.z, 6, 'equal 6');
    });

    it('Vector4 # Add', function() {
        var Vec4 = vector.Vec4;
        var a = Vec4.New(1, 2, 3,1);
        var b = Vec4.New(4, 4, 4,1);

        a.add(b);
        assert.strictEqual(a.x, 5, 'equal 5');
        assert.strictEqual(a.y, 6, 'equal 6');
        assert.strictEqual(a.z, 7, 'equal 7');
        assert.strictEqual(a.w, 2, 'equal 2');
    });

    it('Vector4 # Sub', function() {
        var Vec4 = vector.Vec4;
        var a = Vec4.New(1, 2, 3,1);
        var b = Vec4.New(1, 2, 3,1);

        a.sub(b);
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
        assert.strictEqual(a.w, 0, 'equal 0');
    });

    it('Vector4 # Dot product', function() {
        var Vec4 = vector.Vec4;
        var a = Vec4.New(1, 2, 3,4);
        var b = Vec4.New(1, 1, 2,1);

        var d = a.dot(b);
        assert.strictEqual(d, 13, 'equal 13');
    });








});

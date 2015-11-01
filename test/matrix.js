var assert = require('assert');
var Matrix = require('../matrix');
var assert = require('chai').assert;

describe('Matrix4', function() {

    it('checking the packages', function() {
      assert.isObject(Matrix, 'Matrix is an object');
      assert.isFunction(Matrix.New, 'Matrix is an function');
      assert.isFunction(Matrix.Identity, 'Matrix is an function');
    });
  
    it('Identity Matrix', function() {
      var m = Matrix.Identity();
      assert.isObject(m, 'Matrix is an object');
        
        var a = m.row1;
        assert.strictEqual(a.x, 1, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 1');
        assert.strictEqual(a.w, 0, 'equal 0');
 
        var a = m.row2;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 1, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 1');
        assert.strictEqual(a.w, 0, 'equal 0');
 
        var a = m.row3;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 1, 'equal 1');
        assert.strictEqual(a.w, 0, 'equal 0');
 
        var a = m.row4;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 1');
        assert.strictEqual(a.w, 1, 'equal 0');
    });

    it('Zero Matrix', function() {
      var m = Matrix.New();
      assert.isObject(m, 'Matrix is an object');
        
        var a = m.row1;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
        assert.strictEqual(a.w, 0, 'equal 0');
 
        var a = m.row2;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
        assert.strictEqual(a.w, 0, 'equal 0');
 
        var a = m.row3;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
        assert.strictEqual(a.w, 0, 'equal 0');
 
        var a = m.row4;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
        assert.strictEqual(a.w, 0, 'equal 0');
    });

    it('Matrix4 # set', function() {
    
      var m = Matrix.New();
      assert.isObject(m, 'Matrix is an object');
      m.row1.set(1,0,0,0);
      m.row2.set(0,1,0,9);
      m.row3.set(0,0,1,9);
      m.row4.set(0,2,0,0);

        var a = m.row1;
        assert.strictEqual(a.x, 1, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
        assert.strictEqual(a.w, 0, 'equal 0');
 
        var a = m.row2;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 1, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
        assert.strictEqual(a.w, 9, 'equal 0');
 
        var a = m.row3;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 1, 'equal 0');
        assert.strictEqual(a.w, 9, 'equal 0');
 
        var a = m.row4;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 2, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
        assert.strictEqual(a.w, 0, 'equal 0');

    });


    it('transponse Matrix', function() {
      var m = Matrix.Identity().getTransponse();
      assert.isObject(m, 'Matrix is an object');

        var a = m.row1;

        assert.strictEqual(a.x, 1, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 1');
        assert.strictEqual(a.w, 0, 'equal 0');
 
        var a = m.row2;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 1, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 1');
        assert.strictEqual(a.w, 0, 'equal 0');
 
        var a = m.row3;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 1, 'equal 1');
        assert.strictEqual(a.w, 0, 'equal 0');
 
        var a = m.row4;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 1');
        assert.strictEqual(a.w, 1, 'equal 0');
    });

  
    function p(m){
    
        console.log('matrix->');

        var a = m.row1;
        console.log(a.x , a.y, a.z, a.w);

        var a = m.row2;
        console.log(a.x , a.y, a.z, a.w);
      
        var a = m.row3;
        console.log(a.x , a.y, a.z, a.w);

        var a = m.row4;
        console.log(a.x , a.y, a.z, a.w);
    }

    
    function pmtx(m){
        console.log('Matrix : Debug');

        console.log(m);
        console.log(m[0], m[4], m[8], m[12]  );
        console.log(m[1], m[5], m[9], m[13] );
        console.log(m[2], m[6], m[10], m[14]);
        console.log(m[3], m[7], m[11], m[15]);

    }




    it('Matrix4 # multiply', function() {
    
      var m = Matrix.New();
      var tm = Matrix.New();
      assert.isObject(m, 'Matrix is an object');
      m.row1.set(1,0,0,0);
      m.row2.set(0,1,0,9);
      m.row3.set(0,0,1,9);
      m.row4.set(0,2,0,0);
      

      var identity = Matrix.Identity(); 
        m.multiply(identity);

        var a = m.row1;
        assert.strictEqual(a.x, 1, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
        assert.strictEqual(a.w, 0, 'equal 0');
 
        var a = m.row2;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 1, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
        assert.strictEqual(a.w, 9, 'equal 0');
 
        var a = m.row3;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 1, 'equal 0');
        assert.strictEqual(a.w, 9, 'equal 0');
 
        var a = m.row4;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 2, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
        assert.strictEqual(a.w, 0, 'equal 0');

        
      tm.row1.set(0,0,0,0);
      tm.row2.set(0,1,2,9);
      tm.row3.set(0,2,1,9);
      tm.row4.set(0,0,0,0);

      m.multiply(tm);

        var a = m.row1;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
        assert.strictEqual(a.w, 0, 'equal 0');
 
        var a = m.row2;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 1, 'equal 1');
        assert.strictEqual(a.z, 2, 'equal 2');
        assert.strictEqual(a.w, 9, 'equal 9');
 
        var a = m.row3;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 2, 'equal 2');
        assert.strictEqual(a.z, 1, 'equal 1');
        assert.strictEqual(a.w, 9, 'equal 9');
 
        var a = m.row4;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 2, 'equal 2');
        assert.strictEqual(a.z, 4, 'equal 4');
        assert.strictEqual(a.w, 18, 'equal 18');



    });


});

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var tmpl = __webpack_require__(18);
	var Core = __webpack_require__(2);

	var core = new Core({
	    fullscreen: true,
	    element: document.getElementById('webgl-div')
	});

	var buffer  = core.createBuffer();
	var shader  = core.createShader();
	var texture = core.createTexture();

	var scene = core.createScene();
	var Utils = core.getUtils();



	/* config */
	scene.setViewPort(core.canvas.x, core.canvas.y);
	scene.shader = shader;
	scene.camera = Utils.camera.MakeOrtho(0, 50, 50, 0, 1, -1);

	shader.create(Utils.util.getshaderUsingTemplate(tmpl()));
	/*         */

	var geometry = core.createGeometry();

	buffer.geometry({
	    points: geometry.plane(10, 15).getModel(),
	    size: 9
	});



	/* Generarting XOR Texture */
	var textureSize = 512;
	var pix = [];

	for (var x = 0; x < textureSize; x++) {
	    for (var y = 0; y < textureSize; y++) {
	        var xor = x ^ y;
	        pix.push(xor) // r
	        pix.push(xor) // g
	        pix.push(xor) // b 
	    }
	}
	/* */

	texture.setTexture(new Uint8Array(pix), textureSize, textureSize);

	var Transform = core.MLib.Transform.New();
	var entity = {
	    buffer: buffer,
	    model: Transform.translate(25, 25).getMatrix(),
	    drawType: 'TRIANGLE_STRIP',
	    texture: texture,
	};

	function render() {
	    //Utils.getNextFrame.call(this, render);
	    //window.requestAnimationFrame(render);
	    scene.clean();
	    scene.render(entity);
	};

	render();


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';



	var Core = function(options) {
	    var CanvasGL = __webpack_require__(19);

	    this.Buffer = __webpack_require__(3);
	    this.Shader = __webpack_require__(9);
	    this.Texture = __webpack_require__(10);
	    this.Camera = __webpack_require__(11);
	    this.Scene = __webpack_require__(12);
	    this.Geometry = __webpack_require__(13);

	    var core = new CanvasGL(options.fullscreen, options.element);
	    var webGL = core.getWebGL();


	    this.canvas = core.canvas;
	    this.createBuffer = function() {
	        return this.Buffer.New(webGL);
	    };

	    this.createShader = function() {
	        return this.Shader.New(webGL);
	    };

	    this.createTexture = function() {
	        return this.Texture.New(webGL);
	    };

	    this.createScene = function() {
	        return this.Scene.New(webGL);
	    };

	    this.createGeometry = function() {
	        return this.Geometry.New();
	    };

	    this.getUtils = function() {
	        return {
	            camera: this.Camera.New(),
	            util: __webpack_require__(17).New()
	        };
	    };


	    this.MLib = {
	        Vec3: __webpack_require__(14).Vec3,
	        Vec4: __webpack_require__(14).Vec4,
	        Mat4: __webpack_require__(15),
	        Transform: __webpack_require__(16),
	    };
	};






	module.exports = Core;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict'

	var Factory = __webpack_require__(8);

	Buffer = function(Core, that) {

	    var that = that || {};

	    var gl = Core;

	    var buffer = null;
	    var bufferType = gl.STATIC_DRAW;

	    var size = 0;
	    var stride = 0;

	    var color_size = 4;
	    var vertex_size = 3;
	    var texture_size = 2;

	    var no_color_data = false;
	    var no_texture = false;



	    if (buffer === null)
	        buffer = gl.createBuffer();

	    that.memoryLayout = function(bufferObject) {
	        size = bufferObject.size;
	        that.sides = bufferObject.points.length / bufferObject.size;
	        stride = bufferObject.size * Float32Array.BYTES_PER_ELEMENT;
	    }

	    that.geometry = function(g) {
	        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

	        gl.bufferData(
	            gl.ARRAY_BUFFER,
	            new Float32Array(g.points),
	            bufferType
	        );

	        that.memoryLayout(g);
	    }

	    that.setBufferType = function(type) {
	        if (gl[type] > 0)
	            bufferType = gl[type];

	        console.log('render type-> ', renderType);
	    }


	    that.prepare = function(){
	      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	    };

	    that.update = function(g) {
	        gl.bufferData(
	            gl.ARRAY_BUFFER,
	            new Float32Array(g.points),
	            bufferType
	        );
	    }

	    that.upload_vertex = function(shader_position) {
	        gl.vertexAttribPointer(shader_position,
	            vertex_size,
	            gl.FLOAT,
	            false,
	            stride,
	            0);
	    }

	    that.upload_texture = function(shader_texture) {
	        if (no_texture)
	            return;

	        var offset = vertex_size * Float32Array.BYTES_PER_ELEMENT;

	        if (!no_color_data)
	            offset += color_size * Float32Array.BYTES_PER_ELEMENT;

	        gl.vertexAttribPointer(
	            shader_texture,
	            texture_size,
	            gl.FLOAT,
	            false,
	            stride,
	            offset
	        );
	    }

	    that.upload_colors = function(shader_color) {

	        if (no_color_data)
	            return;

	        gl.vertexAttribPointer(shader_color,
	            color_size,
	            gl.FLOAT,
	            false,
	            stride,
	            vertex_size * Float32Array.BYTES_PER_ELEMENT
	        );
	    }

	    return that;
	};

	module.exports = new Factory(Buffer);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).Buffer))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	var base64 = __webpack_require__(5)
	var ieee754 = __webpack_require__(6)
	var isArray = __webpack_require__(7)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).Buffer, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 6 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	var Factory = function(_Object){

	    this.New = function(core) {
	        return new _Object(core, {});
	    };

	    this.Extend = function(core, that) {
	        return _Object(core, that);
	    };
	};

	module.exports = Factory;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var Factory = __webpack_require__(8);

	var Shader = function(Core, that) {
	    var gl = Core;
	    var program = null;
	    that.vars = {};

	    that.add = function(shaderCode, type) {
	        var shader = null;

	        if (type === 'fragment')
	            shader = gl.createShader(gl.FRAGMENT_SHADER);

	        if (type === 'vertex')
	            shader = gl.createShader(gl.VERTEX_SHADER);

	        if (!shader) {
	            throw 'invalid shader code!!';
	            console.log('invalid shader code' + shaderCode);
	        }

	        gl.shaderSource(shader, shaderCode);
	        gl.compileShader(shader);

	        return shader;
	    }

	    that.use = function() {
	        gl.useProgram(program);
	    }

	    that.attribute = function(param) {
	        that.vars[param] = gl.getAttribLocation(program, param);
	        gl.enableVertexAttribArray(that.vars[param]);
	        return this;
	    }

	    that.uniform = function(param) {
	        that.vars[param] = gl.getUniformLocation(program, param);
	        return this;
	    }

	    that.create = function(code) {
	        if (code && code.vertex && code.fragment) {
	            that.link(code.vertex, code.fragment);
	            code.init(that);
	        }
	    }

	    that.link = function(vertex, fragment) {
	        program = gl.createProgram();

	        gl.attachShader(program, that.add(vertex, 'vertex'));
	        gl.attachShader(program, that.add(fragment, 'fragment'));
	        gl.linkProgram(program);

	        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	            console.log('Error linking shaders.')
	            throw 'error linking shaders';
	        }
	    }

	    that.prepare = function(varsGL) {
	        for (var var_name in varsGL) {
	            var value = varsGL[var_name];
	            gl.uniformMatrix4fv(that.vars[var_name], false, value);
	        }
	    };

	    return that;
	}

	module.exports = new Factory(Shader);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var Factory = __webpack_require__(8);

	/*var Texture = function(Core) {
	    this.texture = 0;
	    this.gl = Core;
	    
	    this.initialize = false; 
	}

	Texture.prototype.Extend = function(options){
	    this.texture = this.gl.createTexture();
	    options.initialize.bind(this)();
	    this.initialize = true; 
	}



	Texture.prototype.loadImage = function(image) {

	    var gl = VR8.webGL;

	    this.texture = gl.createTexture();

	    gl.bindTexture(gl.TEXTURE_2D, this.texture);
	    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	    
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	    gl.bindTexture(gl.TEXTURE_2D, null);
	}


	Texture.prototype.prepare = function(shader_vars) {
	    var gl = VR8.webGL;

	    if(!this.initialize) return;

	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, this.texture);
	    gl.uniform1i(shader_vars['uSampler'], 0);
	}
	*/

	var Texture = function(Core, that) {
	    var gl = Core;
	    that.texture = gl.createTexture();


	    that.setTexture = function( pixels, width, height) {

	        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
	        gl.bindTexture(gl.TEXTURE_2D, that.texture);
	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB,
	            gl.UNSIGNED_BYTE, pixels);

	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	    };

	    that.prepare = function(vars) {
	        if (!this.initialize) return;

	        gl.activeTexture(gl.TEXTURE0);
	        gl.bindTexture(gl.TEXTURE_2D, that.texture);
	        gl.uniform1i(vars['uSampler'], 0);
	    };

	    return that;
	};



	module.exports = new Factory(Texture);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var Factory = __webpack_require__(8);

	var Camera = function(){
	};

	Camera.prototype.MakeOrtho = function(left, right, bottom, top, nearz, farz) {
	    var m = new Float32Array(16);
	    m[1] = m[2] = m[3] = m[4] = m[6] = m[7] = m[8] = m[9] = m[11] = 0.0;

	    m[0] = 2.0 / (right - left);
	    m[5] = 2.0 / (top - bottom)
	    m[12] = -(right + left) / (right - left);
	    m[13] = -(top + bottom) / (top - bottom);
	    m[14] = -(farz + nearz) / (farz - nearz);
	    m[15] = 1.0;
	    return m;
	}

	module.exports = new Factory(Camera);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var Factory = __webpack_require__(8);

	var Scene = function(Core, that) {

	    var that = that || {};
	    var gl = Core;

	    var shader = null;
	    var camera = null;

	    
	    gl.clearColor(0.0, 0.0, 0.0, 1.0);

	    /* this method can be override for custom functionality. */

	    that.setViewPort = function(Width, Height){
	      gl.viewport(0, 0, Width, Height);
	    }

	    that.setClearColor = function(clear){
	        gl.clearColor(clear.r , clear.g , clear.b, 1.0);
	    }

	    that.clean = function() {
	        gl.clear(gl.COLOR_BUFFER_BIT);
	    }

	    that.prepare = function(entity) {
	        this.shader.prepare({
	            'MV': this.camera,
	            'P': entity.model
	        });

	        entity.buffer.prepare();
	        entity.buffer.upload_vertex(this.shader.vars.position);
	        entity.buffer.upload_colors(this.shader.vars.colors);
	        entity.buffer.upload_texture(this.shader.vars.texture);

	        if (entity.texture)
	            entity.texture.prepare(this.shader.vars);
	    };

	    that.draw = function(entity) {
	        if (typeof gl[entity.drawType] === 'number')
	            gl.drawArrays(gl[entity.drawType], 0, entity.buffer.sides);
	        else
	            gl.drawArrays(gl.TRIANGLE_STRIP, 0, entity.buffer.sides);
	    }

	    that.render = function(e) {
	        that.prepare(e);
	        that.draw(e);
	    }

	    return that;
	}


	module.exports = new Factory(Scene);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var Factory = __webpack_require__(8);
	var Vec3 = __webpack_require__(14).Vec3;
	var Vec4 = __webpack_require__(14).Vec4;
	var Mat4 =  __webpack_require__(15);
	var Transform =  __webpack_require__(16);

	var Renderable = function(geometry, color, texture) {
	    this.geometry = geometry || Vec3.New();
	    this.color = color || Vec4.New(0.5, 0.5, 0.5, 1.0);
	    this.texture = setUV(this.geometry) || {
	        u: 0,
	        v: 0
	    };
	};


	var setUV = function(vec2){
	    var texture = {u:0, v:0};


	    var tmp = vec2.normalize();

	    return {u: Math.ceil(tmp.x) , v: Math.ceil(tmp.y)};
	};

	var Polygon = function(Core, that) {

	    that.geometry = [];

	    that.getModel = function() {

	            var tmp = []; 
	        that.geometry.forEach(function(renderable) {
	              tmp.push(
	            renderable.geometry.x,
	            renderable.geometry.y,
	            renderable.geometry.z,

	            renderable.color.x,
	            renderable.color.y,
	            renderable.color.z,
	            renderable.color.w,

	            renderable.texture.u,
	            renderable.texture.v
	                             );
	        });

	        return new Float32Array(tmp);
	    };


	    that.plane = function(width, height){
	        that.geometry.push( new Renderable( Vec3.New(-width, -height ), Vec4.New(0.8, 0.8, 0.8, 1.0 )));
	        that.geometry.push( new Renderable( Vec3.New(width,  -height ), Vec4.New(0.8, 0.8, 0.8, 1.0 )));
	        that.geometry.push( new Renderable( Vec3.New(-width,  height ), Vec4.New(0.8, 0.8, 0.8, 1.0 )));
	        that.geometry.push( new Renderable( Vec3.New(width,   height ), Vec4.New(0.8, 0.8, 0.8, 1.0 )));
	        return that;
	    };

	    that.circle = function( _sides, radius) {

	        var cos = Math.cos;
	        var sin = Math.sin;
	        var PI = Math.PI;

	        var sides = _sides || 5;
	        var ucircle = (2 * PI);
	        that.geometry = [];

	        for (var x = 0; x <= ucircle; x += (ucircle / sides)) {
	            var vertex = Vec3.New(radius * cos(x), radius * sin(x));
	            console.log('->', vertex);
	            that.geometry.push( new Renderable( vertex, Vec4.New(0.8, 0.8, 0.8, 1.0 ), setUV(vertex) ) );
	            
	           // that.geometry.push( new Renderable( Vec3.New(), Vec4.New(), setUV(Vec3.New()) ) ); //center.
	        }

	        return that;
	    };

	    return that;
	};


	module.exports = new Factory(Polygon);


/***/ },
/* 14 */
/***/ function(module, exports) {

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


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Vec4 = __webpack_require__(14).Vec4;


	/*
	 * [ 0 4  8 12 ]   [ 0 4  8 12 ]
	 * [ 1 5  9 13 ] x [ 1 5  9 13 ]
	 * [ 2 6 10 14 ]   [ 2 6 10 14 ]
	 * [ 3 7 11 15 ]   [ 3 7 11 15 ]
	 *
	 *
	 * */


	function p(m) {

	    console.log('Matrix4:Debug');

	    var a = m.row1;
	    console.log(a.x, a.y, a.z, a.w);

	    var a = m.row2;
	    console.log(a.x, a.y, a.z, a.w);

	    var a = m.row3;
	    console.log(a.x, a.y, a.z, a.w);

	    var a = m.row4;
	    console.log(a.x, a.y, a.z, a.w);
	}



	var Matrix4 = function() {

	    this.row1 = Vec4.New();
	    this.row2 = Vec4.New();
	    this.row3 = Vec4.New();
	    this.row4 = Vec4.New();

	    /*
	     * [ 0 4  8 12 ] 
	     * [ 1 5  9 13 ]
	     * [ 2 6 10 14 ]  
	     * [ 3 7 11 15 ] 
	     *
	     * */

	    this.getMatrix = function() {
	        return new Float32Array(
	          [ this.row1.x, this.row2.x, this.row3.x, this.row4.x,
	            this.row1.y, this.row2.y, this.row3.y, this.row4.y,
	            this.row1.z, this.row2.z, this.row3.z, this.row4.z,
	            this.row1.w, this.row2.w, this.row3.w, this.row4.w ]);
	    };

	    this.setIdentity = function() {
	        this.row1 = Vec4.New(1.0, 0.0, 0.0, 0.0);
	        this.row2 = Vec4.New(0.0, 1.0, 0.0, 0.0);
	        this.row3 = Vec4.New(0.0, 0.0, 1.0, 0.0);
	        this.row4 = Vec4.New(0.0, 0.0, 0.0, 1.0);
	    };

	    this.setMatrix = function(m) {
	        this.row1 = m.row1;
	        this.row2 = m.row2;
	        this.row3 = m.row3;
	        this.row4 = m.row4;
	    };

	    this.set = function(r1, r2, r3, r4) {
	        this.row1 = r1;
	        this.row2 = r2;
	        this.row3 = r3;
	        this.row4 = r4;
	    };

	    this.getTransponse = function() {
	        var mtx = MatrixFactory.New();
	        mtx.row1.set(this.row1.x, this.row2.x, this.row3.x, this.row4.x);
	        mtx.row2.set(this.row1.y, this.row2.y, this.row3.y, this.row4.y);
	        mtx.row3.set(this.row1.z, this.row2.z, this.row3.z, this.row4.z);
	        mtx.row4.set(this.row1.w, this.row2.w, this.row3.w, this.row4.w);
	        return mtx;
	    };

	    this.multiply = function(m) {
	        var mtx = MatrixFactory.New();
	        var rhs = m.getTransponse();

	        mtx.row1.set(
	            this.row1.dot(rhs.row1),
	            this.row1.dot(rhs.row2),
	            this.row1.dot(rhs.row3),
	            this.row1.dot(rhs.row4));

	        mtx.row2.set(
	            this.row2.dot(rhs.row1),
	            this.row2.dot(rhs.row2),
	            this.row2.dot(rhs.row3),
	            this.row2.dot(rhs.row4));

	        mtx.row3.set(
	            this.row3.dot(rhs.row1),
	            this.row3.dot(rhs.row2),
	            this.row3.dot(rhs.row3),
	            this.row3.dot(rhs.row4));

	        mtx.row4.set(
	            this.row4.dot(rhs.row1),
	            this.row4.dot(rhs.row2),
	            this.row4.dot(rhs.row3),
	            this.row4.dot(rhs.row4));

	        this.setMatrix(mtx);
	    };
	};


	var MatrixFactory = {

	    New: function() {
	        return new Matrix4();
	    },

	    Identity: function() {
	        var o = new Matrix4();
	        o.setIdentity();
	        return o;
	    },
	};

	module.exports = MatrixFactory;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Vec4 = __webpack_require__(14).Vec4;
	var Mat4 = __webpack_require__(15);


	var Transform = function(m) {
	    var _m = m;

	    this.translate = function(x, y, z) {
	        _m.row1.w = x || 0.0;
	        _m.row2.w = y || 0.0;
	        _m.row3.w = z || 0.0;
	        return this;
	    };

	    this.scale = function(x, y, z) {
	        _m.row1.x = x || 0.0;
	        _m.row2.y = y || 0.0;
	        _m.row3.z = z || 0.0;
	        return this;
	    };

	    this.getMatrix = function(){
	      return _m.getMatrix();
	    }; 

	};

	module.exports = {
	    Apply: function(m) {
	        return new Transform(m);
	    },
	    New: function(){
	      return new Transform( Mat4.Identity() );
	    },
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var Factory = __webpack_require__(8);

	var Utils = function() {

	    /* loading HTML5 rendering API */
	    this.getNextFrame = (function() {
	        return window.requestAnimationFrame ||
	            window.webkitRequestAnimationFrame ||
	            window.mozRequestAnimationFrame ||
	            function(callback) {
	                window.setTimeout(callback, 1000 / 60);
	            };
	    }());

	    /*
	     *  Fetch: this class load all the maps async.
	     */
	    this.Fetch = function(images, callback) {
	        var imgObjects = [];
	        images.forEach(function(image) {
	            var img = new Image();
	            img.onload = function() {
	                imgObjects.push(img);
	                if (imgObjects.length === images.length)
	                    callback(imgObjects);
	            }
	            img.src = image;
	        });
	    };

	    this.getCode = function(EL, from) {
	        return EL.querySelector(from).innerHTML;
	    };


	    this.loadShader = function(tmpl) {
	        var el = document.createElement('div');
	        el.innerHTML = tmpl;
	        return el;
	    };

	    this.getshaderUsingTemplate = function(tmpl) {
	        var EL = this.loadShader(tmpl);
	        var shader = {};

	        shader.vertex = this.getCode(EL, '#vertex-shader');
	        shader.fragment = this.getCode(EL, '#fragment-shader');

	        shader.init = function(shader) {
	            shader.use();
	            shader
	                .attribute('position')
	                .attribute('texture')
	                .attribute('colors')
	                .uniform('MV')
	                .uniform('uSampler')
	                .uniform('P');
	        }

	        return shader;
	    };
	}



	module.exports = new Factory(Utils);


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function (data) {
	var __t, __p = '';
	__p += '<script id="vertex-shader" type="vertex">\n\n     attribute vec3 position;\n     attribute vec2 texture;  \n     attribute vec4 colors;  \n\n     uniform mat4 MV;\n     uniform mat4 P;\n     \n     varying vec2 oTexture;\n     varying vec4 oColors;\n\n    void main(void) { \n      gl_Position = MV * P * vec4(position, 1.0);\n      oTexture = texture;\n      oColors  = colors;\n     }\n\n</script>\n\n\n<script id="fragment-shader" type="fragment">\n    \n    precision mediump float;\n    varying vec2 oTexture;\n    varying vec4 oColors;\n    uniform sampler2D uSampler;\n\n    void main(void) {\n        gl_FragColor = texture2D(uSampler, oTexture) * oColors;\n    }\n\n</script>\n\n';
	return __p
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	var Canvas = function(fullscreen, el) {
	    var _createCanvas = function() {
	        _canvas = document.createElement('CANVAS');
	        _canvas.setAttribute('width', 800);
	        _canvas.setAttribute('height', 600);
	        _canvas.setAttribute('style', 'position:absolute; left:0px; top:0px; border-style:none;');
	        return _canvas;
	    }


	    var _canvas = _createCanvas();
	    var $el = el || document.body;

	    $el.appendChild(_canvas);

	    try {

	        var gl = _canvas.getContext("experimental-webgl");

	        if (!gl) {
	            console.log('Error no webGL context found.');
	            alert('no WebGL context found.')
	        }

	        if (fullscreen) {
	            _canvas.style.width = window.innerWidth + "px";
	            _canvas.style.height = window.innerHeight + "px";
	            _canvas.width = window.innerWidth;
	            _canvas.height = window.innerHeight;
	        }

	    } catch (e) {
	        console.log(e);
	    }

	    return {
	        getWebGL: function() {
	            return gl;
	        },
	        canvas: {
	            x: _canvas.width,
	            y: _canvas.height
	        },
	        fullscreen: fullscreen,
	    };
	}

	module.exports = Canvas;


/***/ }
/******/ ]);
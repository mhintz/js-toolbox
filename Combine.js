// Combine

(function(root) {

// module boilerplate
if (typeof define === 'function' && define.amd) {  // require.js
	define([], definition);
} else if (typeof require === 'function') { // node
	module.exports = definition();
} else { // vanilla
	root.Combine = definition();
}

function definition() {
	
	function extend(obj) {
		var ext, i, l, p;
		for (i = 1, l = arguments.length; i < l; ++i) {
			ext = arguments[i];
			if (ext) {
				for (p in ext) {
					if (ext.hasOwnProperty(p)) obj[p] = ext[p];
				}
			}
		}
		return obj;
	}

	var slice = Array.prototype.slice;

	function Combine() {
		var c = "constructor",
			ctor = function() {};
		for (var i = 0, l = arguments.length; i < l; ++i) {
			if (arguments[i].hasOwnProperty(c)) ctor = arguments[i][c];
		}
		extend.call(null, ctor, Combine);
		extend.apply(null, [ctor.prototype].concat(slice.call(arguments)));
		return ctor;
	}

	Combine.extend = function() {
		return Combine.apply(null, [this.prototype].concat(slice.call(arguments)));
	};

	return Combine;
}

})(this);
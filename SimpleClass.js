// SimpleClass

(function(root) {

// module boilerplate
if (typeof define === 'function' && define.amd) {  // require.js
	define([], definition);
} else if (typeof require === 'function') { // node
	module.exports = definition();
} else { // vanilla
	root.SimpleClass = definition();
}

function definition() {

	function SimpleClass(protoProps, staticProps) {
		var c = "constructor",
			ctor = protoProps.hasOwnProperty(c) ? protoProps[c] : function() {};
		for (var prop in protoProps) {
			if (prop !== c) ctor.prototype[prop] = protoProps[prop];
		}
		for (prop in staticProps) { ctor[prop] = staticProps[prop]; }
		return ctor;
	}

	return SimpleClass;
}

})(this);
// Extendable v. 1.0

(function() {

// module boilerplate
if (typeof define === 'function' && define.amd) {  // require.js
	define([], moduleDef);
} else if (typeof require === 'function') { // node
	module.exports = moduleDef();
} else { // vanilla
	Extendable = moduleDef();
}

function moduleDef() {

	function Extendable(constructor) { // adds class extension functions to a constructor
		if (!constructor) constructor = function() {};
		Extendable.extend(constructor, Extendable.prototype);
		return constructor;
	}

	Extendable.extend = function(baseObj) {
		var extObj;
		for (var i = 1, l = arguments.length; i < l; ++i) {
			extObj = arguments[i];
			if (extObj) {
				for (var prop in extObj) {
					baseObj[prop] = extObj[prop];
				}
			}
		}
		return baseObj;
	};

	Extendable.prototype = {
		staticExtend: function() { // extend the constructor with static properties
			return Extendable.extend.apply(this, [this].concat(Array.prototype.slice.call(arguments)));
		},
	    extendPrototype: function() { // extend the constructor's prototype with properties for all instances
	        return Extendable.extend.apply(this, [this.prototype].concat(Array.prototype.slice.call(arguments)));
	    },
	    makeSubClass: function(members, staticProps) { // implementation taken from Backbone's "extend" - this returns a subclass which inherits from the constructor's prototype
	    	var parentConstructor = this,
	    		childConstructor;

	    	if (members && members.hasOwnProperty("constructor")) { // hasOwnProperty check necessary to avoid using Object as the constructor
	    		childConstructor = members.constructor;
	    	} else {
	    		childConstructor = function() { return parentConstructor.apply(this, arguments); };
	    	}

	    	Extendable.extend(childConstructor, parentConstructor, staticProps);

	    	var Surrogate = function() { this.constructor = childConstructor; };
	    	Surrogate.prototype = parentConstructor.prototype;
	    	childConstructor.prototype = new Surrogate();

	    	if (members) Extendable.extend(childConstructor.prototype, members);

	    	return childConstructor;
	    }
	};

	return Extendable;
}

})();
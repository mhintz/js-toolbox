// a little composable class creator
function Composable(consFunc) {
	function ComposableClass() {
		this.constructor = constructor;
		return constructor.apply(this, arguments);
	}

	var constructor = consFunc || function ComposableConstructor() {},
		ccp = ComposableClass.prototype;

	// used to set the constructor function for the composable class
	ComposableClass.setConstructor = function(consFunc) {
		constructor = consFunc;
		return ComposableClass;
	};

	// used to compose the class with properties from other objects/classes
	ComposableClass.compose = function(sourceObj) {
		var args = Array.prototype.slice.call(arguments, 1), prop;
		for (var i = 0, l = args.length; i < l; ++i) {
			prop = args[i];
			ccp[prop] = sourceObj[prop] || (sourceObj.prototype && sourceObj.prototype[prop]);
		}

		return ComposableClass;
	};

	// used to add a property to the composable class
	ComposableClass.add = function(name, value) {
		ccp[name] = value;
		return ComposableClass;
	};

	// used to inject the composable class's properties into another class
	ComposableClass.inject = function(targetObj) {
		var top = targetObj.prototype,
			args = Array.prototype.slice.call(arguments, 1),
			prop;

		for (var i = 0, l = args.length; i < l; ++i) {
			prop = args[i];
			if (ccp[prop]) top[prop] = ccp[prop];
		}

		return ComposableClass;
	};

	return ComposableClass;
}
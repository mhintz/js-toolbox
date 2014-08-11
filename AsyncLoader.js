// AsyncLoader

(function() {

// module boilerplate
if (typeof define === 'function' && define.amd) {  // require.js
	define([], moduleDef);
} else if (typeof require === 'function') { // node
	module.exports = moduleDef();
} else { // vanilla
	AsyncLoader = moduleDef();
}

function moduleDef() {

	function AsyncLoader(cbFunc) {
		var loadItems = {};

		this.registerLoadItem = function(name) {
			loadItems[name] = false;
		};

		this.triggerLoaded = function(name) {
			loadItems[name] = true;
			if (this.checkLoaded()) cbFunc();
		};

		this.checkLoaded = function() {
			for (var name in loadItems) {
				if (!loadItems[name]) return false;
			}
			return true;
		};

		this.setCallback = function(newCB) {
			cbFunc = newCB;
		};
	}

	return AsyncLoader;
}

})();
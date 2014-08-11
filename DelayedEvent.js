// DelayedEvent v. 1.0

(function() {

// module boilerplate
if (typeof define === 'function' && define.amd) {  // require.js
	define([], moduleDef);
} else if (typeof require === 'function') { // node
	module.exports = moduleDef();
} else { // vanilla
	DelayedEvent = moduleDef();
}

function moduleDef() {

	function DelayedEvent() {
		this.timers = {};
		this.events = {};
	}

	var dep = DelayedEvent.prototype;

	dep.slice = Array.prototype.slice;

	dep.on = function(evt, handler, ctxt) {
		if (!this.events[evt]) this.events[evt] = [];
		this.events[evt].push({
			func: handler,
			ctxt: ctxt
		});
		return this;
	};

	dep.off = function(evt, handler) {
		var evts = this.events[evt];
		if (!handler || !evts) return this.events[evt] = null, this;
		for (var i = 0, l = evts.length; i < l; ++i) {
			if (evts[i].m === handler) {
				this.events[evt].splice(i, 1);
				return this;
			}
		}
		return this;
	};

	dep.trigger = function(evt, delay) {
		var that = this, args = this.slice.call(arguments, 2);
		if (delay === 0) return this.fire.apply(this, [evt].concat(args)), this; // runs synchronously
		if (this.timers[evt]) clearTimeout(this.timers[evt]);
		this.timers[evt] = setTimeout(function() {
			that.fire.apply(that, [evt].concat(args)); // runs asynchronously
		}, delay);
		return this;
	};

	dep.cancel = function(evt) {
		if (this.timers[evt]) clearTimeout(this.timers[evt]);
		return this;
	};

	dep.fire = function(evt) {
		var evts = this.events[evt], e, args;
		if (!evts) return this;
		args = this.slice.call(arguments, 1);
		for (var i = 0, l = evts.length; i < l; ++i) {
			e = evts[i];
			if (!e.func) continue;
			e.func.apply(e.ctxt, args);
		}
	};

	return DelayedEvent;
}

})();
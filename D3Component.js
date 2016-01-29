(function(root) {
  // requires jquery, underscore, backbone, and d3

  // Component class
  var D3Component = function(options) {
    this.cid = _.uniqueId('d3_component');
    options || (options = {});
    _.extend(this, _.pick(options, componentOptions));
    this._ensureElementAndSelection();
    this.initialize.apply(this, arguments);
  };

  var componentOptions = ['model', 'collection', 'el', 'sel', 'id', 'attributes', 'className', 'tagName', 'events'];

  _.extend(D3Component.prototype, Backbone.Events, {
    initialize: function() {}
  });

  D3Component.extend = Backbone.View.extend;

  root.D3Component = D3Component;

})(this);

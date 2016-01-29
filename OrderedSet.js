function OrderedSet() { // don't add null to me!
  if (!(this instanceof OrderedSet)) return new OrderedSet();
  var prefix = '\0';
  var valuesList = [];
  var setMap = Object.create(null);

  this.add = function(v) {
    if (!this.has(v)) {
      setMap[prefix + v] = valuesList.push(v) - 1;
      return true;
    } else {
      return false;
    }
  };

  this.values = function() { return valuesList.filter((v) => v !== null); };

  this.has = function(v) { return (setMap[prefix + v] != undefined); }; // != checks for null or undefined

  this.remove = function(v) {
    if (this.has(v)) {
      var prefixed = prefix + v;
      valuesList[setMap[prefixed]] = null;
      setMap[prefixed] = null;
    }
  };
}

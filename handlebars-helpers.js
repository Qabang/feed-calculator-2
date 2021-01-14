module.exports = {
  ifvalue: function (conditional, options) {
    if (options.hash.value === conditional) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  setVariable: function (varName, varValue, options) {
    options.data.root[varName] = varValue;
  },

  iff: function (a, operator, b, opts) {
    var bool = false;
    switch (operator) {
      case "==":
        bool = a == b;
        break;
      case ">":
        bool = a > b;
        break;
      case "<":
        bool = a < b;
        break;
      default:
        throw "Unknown operator " + operator;
    }

    if (bool) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  },
  for: function (from, to, incr, block) {
    var accum = "";
    for (var i = from; i < to; i += incr) accum += block.fn(i);
    return accum;
  },
};

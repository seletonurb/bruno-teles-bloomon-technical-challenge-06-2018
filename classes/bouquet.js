(function() {
  'use strict';

  module.exports = class Bouquet {
    constructor(code) {
      this.code = code;
      this.speciesQuantityMap = {};
      this.total = 0;
    }
    addFlowers(speciesCode, quantity) {
      if (!this.speciesQuantityMap[speciesCode]) {
        this.speciesQuantityMap[speciesCode] = 0;
      }
      this.speciesQuantityMap[speciesCode] += quantity;
      this.total += quantity;
    }
    toString() {
      var str='';

      str+=this.code;

      for (var key in this.speciesQuantityMap) {
        if (this.speciesQuantityMap.hasOwnProperty(key)) {
          str += this.speciesQuantityMap[key];
          str += key;
        }
      }
      return str;
    }
  }
})();

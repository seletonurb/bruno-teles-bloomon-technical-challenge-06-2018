(function() {
  'use strict';

  var helpers = require('../helpers');

  module.exports = class DesignRule {

    constructor(inputDesignRule) {
      var parsedDesignRule = helpers.parseBouquetDesignRules(inputDesignRule);

      this.bouquetCode = parsedDesignRule.bouquetCode;
      this.bouquetSize = parsedDesignRule.bouquetSize;
      this.speciesQuantityMap = parsedDesignRule.speciesQuantityMap;
      this.bouquetQuantity = parsedDesignRule.bouquetQuantity;
    }
  }
})();

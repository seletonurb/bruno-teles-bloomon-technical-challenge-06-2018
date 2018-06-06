(function() {
  'use strict';

  module.exports = class ProductionFacility {
    constructor(designRules) {
      this.designRules = designRules;
      console.log("Production Facility created!");
    }
    startBouquetProduction(flowers) {
      console.log("Started Bouquet Production!");
    }
  }
})();

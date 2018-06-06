(function() {
  'use strict';

  var Bouquet = require('./bouquet'),
    DesignRule = require('./design-rule');


  module.exports = class ProductionFacility {
    constructor(designRules) {
      this.designRules = [];
      // assume facility is organized in flower buckets
      this.flowerBuckets = {};
      // debug
      // console.log("Production Facility created!");
    }
    addDesignRule(designRule) {
      this.designRules.push(designRule);
    }
    addFlower(flower) {
      var flowerCode = flower.code;

      if (!this.flowerBuckets[flowerCode]) {
        this.flowerBuckets[flowerCode] = 0;
      }
      this.flowerBuckets[flowerCode]++;
    }
    getTotalFlowersInStock(size) {
      var quantities = [];

      for (var key in this.flowerBuckets) {
        if (this.flowerBuckets.hasOwnProperty(key) && (key[1]===size || !size)) {
          quantities.push(this.flowerBuckets[key]);
        }
      }

      return quantities.reduce(function(acc, quantity) {
        return acc + quantity;
      }, 0);
    }
    buildBouquet(flowerQuantityToSubtractMap, designRule) {
      var bouquet = new Bouquet(designRule.bouquetCode);
      var bouquetSize = designRule.bouquetSize;
      var anyFLowersQuantity = 0;

      for (var key in flowerQuantityToSubtractMap) {
        if (flowerQuantityToSubtractMap.hasOwnProperty(key)) {
          var flowerSpeciesCode = key[0];
          bouquet.addFlowers(flowerSpeciesCode, designRule.speciesQuantityMap[flowerSpeciesCode]);
          this.flowerBuckets[key] -= designRule.speciesQuantityMap[flowerSpeciesCode];
        }
      }

      // adds all the remaining flowers that were not specified in the design rule: it can be any type
      anyFLowersQuantity = designRule.bouquetQuantity - bouquet.total;

      for (var key in this.flowerBuckets) {
        var flowerSize;
        // no more flowers left to add. Bouquet is ready and Exit loop
        if (anyFLowersQuantity <= 0) {
          break;
        }
        // ignores flower sizes that do not correspond to the bouquet size
        flowerSize = key[1];
        if (flowerSize !== bouquetSize) {
          continue;
        }
        if (this.flowerBuckets.hasOwnProperty(key)) {
          var flowerSpeciesCode = key[0];
          var addQuantity;

          if (this.flowerBuckets[key] > anyFLowersQuantity) {
            addQuantity = anyFLowersQuantity;
            this.flowerBuckets[key] -= addQuantity;
          } else {
            addQuantity = this.flowerBuckets[key];
            this.flowerBuckets[key] = 0;
          }
          bouquet.addFlowers(flowerSpeciesCode, addQuantity);
          anyFLowersQuantity -= addQuantity;
        }
      }

      return bouquet;
    }

    /* returns a bouquet or undefined if not ready */
    checkBouquetReady() {
      var bouquet;
      var designRule;
      var bouquetSize;
      var key;
      var speciesQuantity;
      var isDesignRuleRespected;
      var tempFlowerTotal;
      var flowerBouquetTotal;
      var flowerQuantityToSubtractMap;

      for (var i = 0; i < this.designRules.length; i++) {
        designRule = this.designRules[i];
        bouquetSize = designRule.bouquetSize;
        isDesignRuleRespected = true;
        tempFlowerTotal = this.getTotalFlowersInStock(bouquetSize);
        flowerBouquetTotal = 0;
        flowerQuantityToSubtractMap = {};

        for (var species in designRule.speciesQuantityMap) {
          if (designRule.speciesQuantityMap.hasOwnProperty(species)) {
            key = species + bouquetSize;
            speciesQuantity = designRule.speciesQuantityMap[species];
            if (!this.flowerBuckets[key] || this.flowerBuckets[key] < speciesQuantity) {
              isDesignRuleRespected = false;
              break;
            } else {
              flowerQuantityToSubtractMap[key] = speciesQuantity;
              tempFlowerTotal -= speciesQuantity;
              flowerBouquetTotal += speciesQuantity;
            }
          }
        }

        // last check is for any remaining flowers species in stock that can fill up the bouquet
        if (isDesignRuleRespected && tempFlowerTotal >= (designRule.bouquetQuantity-flowerBouquetTotal)) {
          // build bouquet
          bouquet = this.buildBouquet(flowerQuantityToSubtractMap, designRule);
          break;
        }
      };

      return bouquet;

    }
  }
})();

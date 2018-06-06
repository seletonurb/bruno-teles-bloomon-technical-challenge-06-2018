(function() {
  'use strict';

  module.exports = class Flower {
    constructor(inputFlower) {
      this.code = inputFlower;
      this.species = inputFlower[0];
      this.size = inputFlower[1];
    }
  }
})();

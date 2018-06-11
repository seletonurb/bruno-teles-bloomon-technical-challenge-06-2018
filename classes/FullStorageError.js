(function() {
  'use strict';

  module.exports = class FullStorageError extends Error {
    constructor() {
      super('The storage facility is full and cannot store more flowers.');
      this.name = 'FullStorageError';
    }
  }
})();

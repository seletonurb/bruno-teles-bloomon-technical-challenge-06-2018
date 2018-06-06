(function() {
  'use strict';

  var helpers = {};
  var SEPARATOR = ',';

  function isNumeric(character) {
    return /^\d+$/.test(character);
  }

  function isLetter(character) {
    return /[a-z]/.test(character.toLowerCase());
  }

  function isSameType(character1, character2) {
    return (isNumeric(character1) && isNumeric(character2)) || (isLetter(character1) && isLetter(character2));
  }

  /*
  this.bouquetCode : first two characters
  this.bouquetSize : second character
  this.speciesQuantityMap : middle of the input string
  this.bouquetQuantity : last number;
  */
  helpers.parseBouquetDesignRules = function(inputDesignRule) {
    var parsedDesignRule = {
        speciesQuantityMap: {}
      },
      inputDesignRuleSeparated = '',
      remainingStr,
      designRulesSplit,
      lastItem;

    parsedDesignRule.bouquetCode = inputDesignRule.slice(0, 2);
    parsedDesignRule.bouquetSize = inputDesignRule[1];

    // parse speciesQuantityMap field
    remainingStr = inputDesignRule.slice(2);
    for (var i = 0; i < remainingStr.length; i++) {
      inputDesignRuleSeparated += remainingStr[i];
      if (i === remainingStr.length-1) {
          break;
      }
      if (isSameType(remainingStr[i], remainingStr[i + 1]) === false) {
        inputDesignRuleSeparated += SEPARATOR;
      }
    }

    designRulesSplit = inputDesignRuleSeparated.split(SEPARATOR);
    lastItem = designRulesSplit.pop();
    parsedDesignRule.bouquetQuantity = parseInt(lastItem, 10);;

    var j = 0;
    var species;
    var speciesQuantity;
    while (j < designRulesSplit.length) {
      speciesQuantity = designRulesSplit[j];
      species = designRulesSplit[j + 1];
      parsedDesignRule.speciesQuantityMap[species] = parseInt(speciesQuantity, 10);
      j += 2;
    }

    return parsedDesignRule;
  }

  module.exports = helpers;
})();

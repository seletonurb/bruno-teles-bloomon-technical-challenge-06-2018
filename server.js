var ProductionFacility = require('./classes/production-facility'),
  DesignRule = require('./classes/design-rule'),
  Flower = require('./classes/flower');

//creates Production facility
var productionFacility = new ProductionFacility();
// this variable will switch to true when all input Design Rules are read (detection of empty input line)
var allDesignRulesRead = false;

function isEmpty(str) {
  return (!str || 0 === str.length);
}

function processLine(line) {
  var inputDesignRule,
    inputFlower,
    designRule,
    bouquet,
    flower;

  if (isEmpty(line)) {
    allDesignRulesRead = true;
    // debug
    //console.log("All Design Rules Read!");
    return;
  }

  if (!allDesignRulesRead) {
    inputDesignRule = line;
    designRule = new DesignRule(inputDesignRule);
    productionFacility.addDesignRule(designRule);
  } else {
    inputFlower = line;
    flower = new Flower(inputFlower);
    productionFacility.addFlower(flower);
    bouquet = productionFacility.checkBouquetReady();
    if (bouquet) {
      console.log(bouquet.toString());
    }
  }
}

readData = function(input) {
  var line,
    totalLines = input.length;

  for (var i = 0; i < totalLines; i++) {
    line = input[i];
    // console.log("line: " + line);
    processLine(line);
  }
  // exit after all data is processed
  process.exit(0);
}

/********************Manual stdin**********************/
function removeLineBreaks(str) {
  if (str && str.length >= 2) {
    return str.slice(0, str.length - 2);
  }
  return str;
}

process.stdin.resume();
process.stdin.setEncoding("ascii");

process.stdin.on('data', function(input) {
  // debug
  // console.log("Data signal : " + input);
  input = removeLineBreaks(input);
  processLine(input);
});
/******************************************************/

module.exports = {
  readData: readData
}

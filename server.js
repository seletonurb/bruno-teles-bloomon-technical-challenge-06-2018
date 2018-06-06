var fs = require('fs'),
  filename,
  inputDesignRules = [],
  designRules = [],
  flowers = [],
  helpers = require('./helpers'),
  ProductionFacility = require('./classes/production-facility'),
  DesignRule = require('./classes/design-rule'),
  Flower = require('./classes/flower');

//creates Production facility
var productionFacility = new ProductionFacility();

function readLine(input, lineNumber) {
  return input[lineNumber];
}

function readData(input) {
  var line,
    totalLines = input.length,
    isDesignRules = true,
    inputDesignRule,
    designRule,
    bouquet,
    flower;

  for (var i = 0; i < totalLines; i++) {
    line = readLine(input, i);
    // console.log("line: " + line);

    // empty lines evaluates to falsy
    if (!line) {
      isDesignRules = false;
      continue;
    }

    if (isDesignRules) {
      inputDesignRule=line;
      designRule = new DesignRule(inputDesignRule);
      productionFacility.addDesignRule(designRule);
    } else {
      inputFlower=line;
      flower = new Flower(inputFlower);
      productionFacility.addFlower(flower);
      bouquet = productionFacility.checkBouquetReady();
      if (bouquet) {
        console.log(bouquet.toString());
      }
    }
  }
}
/* returns input as lines */
function breakLines(input) {
  return input.split("\n");;
}
/********************Manual stdin**********************/
var _input = "";
process.stdin.resume();
process.stdin.setEncoding("ascii");

process.stdin.on('data', function(input) {
  _input += input;
});
process.stdin.on('end', function() {
  var input_stdin_array = breakLines(input);
  readData(input_stdin_array);
});
process.stdin.on('SIGINT', function() {
  var input_stdin_array = breakLines(input);
  readData(input_stdin_array);
});
/******************************************************/

/********************File read**********************/

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' <filemname>');
  process.exit(1);
}
/* Read the file and print its contents. */
filename = process.argv[2];

function readFile() {
  fs.readFile(filename, 'utf8', function(err, data) {
    var dataArray;

    if (err) {
      throw err;
    }
    dataArray = breakLines(data);
    readData(dataArray);
  });
}
// dev: wait for inspector
setTimeout(readFile, 1500, 'funky');



/******************************************************/

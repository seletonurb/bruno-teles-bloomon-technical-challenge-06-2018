var fs = require('fs'),
  filename,
  inputDesignRules = [],
  inputFlowers = [],
  designRules = [],
  flowers = [],
  ProductionFacility = require('./production-facility');

function readLine(input, lineNumber) {
  return input[lineNumber];
}

function readData(input) {
  var line,
    totalLines = input.length,
    isDesignRules = true;

  for (var i = 0; i < totalLines; i++) {
    line = readLine(input, i);

    // empty lines evaluates to falsy
    if (!line) {
      isDesignRules = false;
      continue;
    }

    if (isDesignRules) {
      inputDesignRules.push(line);
    } else {
      inputFlowers.push(line);
    }
  }
  console.log("designRules: " + inputDesignRules.toString());
  console.log("flowers: " + inputFlowers.toString());
}
/* returns input as lines */
function breakLines(input) {
  return input.split("\n");;
}
/********************Manual stdin**********************/
// var _input = "";
// process.stdin.resume();
// process.stdin.setEncoding("ascii");
//
// process.stdin.on('data', function (input) {
//     _input += input;
// });
// process.stdin.on('end', function () {
//   var input_stdin_array = breakLines(input);
//   readData(input_stdin_array);
// });
// process.stdin.on('SIGINT', function () {
//   var input_stdin_array = breakLines(input);
//   readData(input_stdin_array);
// creates Production facility
// var productionFacility = new ProductionFacility();
// });
/******************************************************/

/********************File read**********************/

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' <filemname>');
  process.exit(1);
}
/* Read the file and print its contents. */
filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
  var dataArray;

  if (err) {
    throw err;
  }
  dataArray = breakLines(data);
  readData(dataArray);

  // creates Production facility
  var productionFacility = new ProductionFacility();
  productionFacility.startBouquetProduction();
});
/******************************************************/

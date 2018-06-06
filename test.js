var fs = require('fs'),
  server = require('./server'),
  filename;

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' <filename>');
  process.exit(1);
}
/* Read the file and print its contents. */
filename = process.argv[2];

/* returns input as lines */
function breakLines(input) {
  return input.split("\n");;
}

function readFile() {
  fs.readFile(filename, 'utf8', function(err, data) {
    var dataArray;

    if (err) {
      throw err;
    }
    dataArray = breakLines(data);
    server.readData(dataArray);
  });
}
// dev: wait for inspector
setTimeout(readFile, 1500, 'funky');

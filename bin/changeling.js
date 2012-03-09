var colors = require('colors')
  ,_ = require('underscore')
  , fs = require('fs')
  , cp = require('child_process')
  , fileLocation = './'
  , fileName = '.changeling'
  , fullFilePath = fileLocation + fileName
  , unprocessedScripts = fs.readdirSync('.')
  , handle = fs.openSync(fileName, 'a+')
  , processedScripts = fs.readFileSync(fullFilePath, 'utf8').split('\n')
  , filesToProcess = _.difference(unprocessedScripts, processedScripts);

processedScripts.forEach(function(value) {
  if (value !== '') {
    var msg = 'Skipping ' + value;
    console.log(msg.blue);
  }
}); 

function execFile(value, error, stout, sterr) {
    if (sterr) {
      console.error(sterr.red);
    }
    if (stout) {
      console.log(stout.grey);
    }
    if (!error && !sterr) {
      var msg = value + ' executed successfully';
      console.log(msg.green);
      fs.writeSync(handle, value + '\n');
    }
  }


filesToProcess.forEach(function(value) {
  if (value !== fileName) {
    cp.exec('node ' + value, execFile.bind(execFile, value));
  }
});
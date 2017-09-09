
var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    url = require('url');

// TODO: Use configuration to set this; or start in this directory
var noteDocRepoDir = '/Users/robertwood/Google Drive/NoteDocRepo/'

// {DataLink:URL:https://stackoverflow.com/questions/8590042/parsing-query-string-in-node-js}
var server = http.createServer(function(request, response){
  var queryParams = url.parse(request.url, true).query;
  console.log(queryParams.dir + ', ' + queryParams.file)
  var filePathName = noteDocRepoDir + queryParams.dir + '/' + queryParams.file;
  console.log(filePathName)

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  fs.readFile(filePathName, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    response.write(data);
    response.end();
  });

}).listen(5011);
console.log('Ready')
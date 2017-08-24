//
// Run ab -c 10 -n 100 localhost:4444/ | wc - l
// Nothing is created in http-stress.log
//

var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    url = require('url');

var noteDocRepoDir = '/Users/robertwood/Google Drive/NoteDocRepo/'
//var noteDocRepoDir = "/Users/robertwood/Temp/"

// {DataLink:URL:https://stackoverflow.com/questions/8590042/parsing-query-string-in-node-js}
var server = http.createServer(function(request, response){
  var queryParams = url.parse(request.url, true).query;
  console.log(queryParams.dir + ', ' + queryParams.fileName)
  var filePathName = noteDocRepoDir + queryParams.dir + '/' + queryParams.fileName;
  console.log(filePathName)

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  fs.readFile(filePathName, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    //console.log(data);
    response.write(data);
    //response.write('hello ');
    response.end();
  });

}).listen(5011);
console.log('Ready')
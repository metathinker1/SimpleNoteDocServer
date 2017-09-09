
const http = require('http'),
  connect = require('connect'),
  path = require('path'),
  fs = require('fs'),
  url = require('url');

// TODO: Use configuration to set this; or start in this directory
const noteDocRepoDir = '/Users/robertwood/Google Drive/NoteDocRepo/'
const app = connect();

// {DataLink:URL:https://stackoverflow.com/questions/8590042/parsing-query-string-in-node-js}
app.use('/get-notedoc', function(req, res, next) {
  var queryParams = url.parse(req.url, true).query;
  console.log(queryParams.dir + ', ' + queryParams.file)
  var filePathName = noteDocRepoDir + queryParams.dir + '/' + queryParams.file;
  console.log(filePathName)

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  fs.readFile(filePathName, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    res.write(data);
    res.end();
  });

});

app.listen(5011);

console.log('Ready')
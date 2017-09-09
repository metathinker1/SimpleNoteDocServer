
const http = require('http'),
  connect = require('connect'),
  path = require('path'),
  fs = require('fs'),
  url = require('url'),
  qs = require('qs');

// TODO: Use configuration to set this; or start in this directory
const noteDocRepoDir = '/Users/robertwood/Google Drive/NoteDocRepo/'
const app = connect();

// Tool
function getMethods(obj) {
  var result = [];
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
        result.push(id + ": " + obj[id].toString());
      }
    } catch (err) {
      result.push(id + ": inaccessible");
    }
  }
  return result;
}

// TODO: Generalize so user can get subdirectories
app.use('/get-directories', function(req, res, next) {
  // Attempt 1
  // https://stackoverflow.com/questions/18112204/get-all-directories-within-directory-nodejs
  // const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(p+"/"+f).isDirectory())
  //   inspecting dirs I found a bunch of errors ... moving on ...


  // https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
  // Async verion -- no need
  // fs.readdir(noteDocRepoDir, (err, files) => {
  //   files.forEach(file => {
  //     console.log(file);
  //   });
  // })

  const dirs = [];
  fs.readdirSync(noteDocRepoDir).forEach(item => {
    var fullPath = path.join(noteDocRepoDir, item)
    if (fs.statSync(fullPath).isDirectory()) {
      dirs.push(item);
    }
  })
  console.log(dirs);
  res.write(JSON.stringify(dirs))
  res.end();
});

app.use('/get-files', function(req, res, next) {
  const query = req._parsedUrl.query;
  const queryParts = qs.parse(query);
  const dir = queryParts.valueOf()['dir'];
  console.log(dir)
  const dirPath = noteDocRepoDir + dir 

  const files = [];
  fs.readdirSync(dirPath).forEach(item => {
    var fullPath = path.join(dirPath, item)
    if (fs.statSync(fullPath).isFile()) {
      files.push(item);
    }
  })
  res.write(JSON.stringify(files))
  res.end();
});

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
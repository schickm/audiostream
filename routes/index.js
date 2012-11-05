var fs = require('fs');
var dir = '/Users/wangstabill/Downloads/A\ Perfect\ Circle\ \(Thirteenth\ Step\)/';
var exec = require('child_process').exec;

function escapeshell (cmd) {
  return cmd.replace(/(["\s'$`\\\(\)])/g,'\\$1');
};

exports.index = function(req, res){
  res.render('index', {
    title: 'Jukebox',
    files: fs.readdirSync(dir)
  });
};

exports.transcode = function (req, res) {
  console.log('got a request!');
  console.log(req.headers);
  //console.dir(req.params.filename);
  var requestedFile = req.params.filename;
  var actualFile = requestedFile.replace(/\.ogg$/, '.mp3');
  
  
  
  //res.sendfile('library/' + requestedFile);
  fs.exists('library/' + requestedFile, function (exists) {
    if (exists) {
      res.sendfile('library/' + requestedFile);
      console.log('file sent');
    } else {
      console.log('file does not exist, transcoding needed');
    }
  });
  
  /*var command = 'ffmpeg -i ' + escapeshell(dir + actualFile) +
    ' -acodec libvorbis -map 0:0 library/' + escapeshell(requestedFile);
  //console.log('command to run: \n', command);
  
  var child = exec(command, function (error, stdout, stderr) {
    console.log('in child process');
    res.sendfile('library/' + requestedFile);
    console.log('sent');
    child.kill('SIGTERM');
  });*/
}
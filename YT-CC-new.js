const fs = require('fs');
const ytdl = require('ytdl-core');
const prism = require('prism-media');
const dfpwm = require('dfpwm');
const https = require('https');
const {Duplex} = require('stream');
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

const delay = ms => new Promise(res => setTimeout(res, ms));

/*
//cup of coffee
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
setInterval(function() {
    http.get(`https://yt-cc.herokuapp.com/`);
}, 300000);
*/

var server = http.createServer(function(req,res){
  var parsedUrl = url.parse(req.url,true);
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');
  var queryStringObject = parsedUrl.query;
  var method = req.method.toLowerCase();
  var headers = req.headers;
  var decoder = new StringDecoder('utf-8');
  var buffer1 = '';
  req.on('data',function(data){
    buffer1 += decoder.write(data);
  });
  req.on('end',function(){
    buffer1 += decoder.end();

    let vidURL = buffer1;
    //res.write('Hello World\n');
    console.log('Request recieved with these headers',headers);
    console.log('Request recieved with this payload: ',buffer1);
    var result = runThings(vidURL);
    res.end(result);
  });

});


server.listen(3000,function(){
  console.log(`The server is listening on port 3000 now`);
});


async function makeRequest(vidURL) {
    return await new Promise((resolve, reject) => {
        const transcoder = new prism.FFmpeg({
            args: [
              '-analyzeduration', '0',
              '-loglevel', '0',
              '-f', 's8',
              '-ar', '48000',
              '-ac', '1',
              '-filter', 'volume=0.35',
            ]
           })
        ytdl(vidURL, { filter: 'audioonly'})
        .pipe(transcoder)
        .pipe(new dfpwm.Encoder())
        .pipe(https.request("https://tempfiles.ninja/api/upload", {
          method: "POST",
          headers: {"Content-Type": "application/octet-stream"}
        }, res => {
          
          let chunks = [];
          res.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
          res.on('error', (err) => reject(err));
          res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
          
         /*
          var decoder2 = new StringDecoder('utf-8');
          var buffer2 = '';
          res.on('data',function(data){
            buffer2 += decoder2.write(data);
          });
          res.on('end',function(){
            buffer2 += decoder2.end();
            return buffer2;
          });
          */
        }));
    });
  }

  async function runThings(vidURL) {
    //let vidURL1 ='https://www.youtube.com/watch?v=M3IGrj7g0fA&list=RDddJiP3jRVJ8'
      console.log('Attempting download of:',vidURL)
      var data = JSON.parse(await makeRequest(vidURL));

      console.log('File uploaded...')
      const dlURL = await data.download_url
      //console.log(dlURL)
      var newURL = buffer.from(dlURL)
      return newURL;
  }

//runThings();

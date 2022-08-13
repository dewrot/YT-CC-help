const fs = require('fs');
const ytdl = require('ytdl-core');
const prism = require('prism-media');
const dfpwm = require('dfpwm');
const https = require('https');
const {Duplex} = require('stream');
var http = require('http');
var url = require('url');

const delay = ms => new Promise(res => setTimeout(res, ms));


//cup of coffee
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
setInterval(function() {
    http.get(`https://yt-cc.herokuapp.com/`);
}, 300000);


var server = http.createServer(function(req,res){
  var parsedUrl = url.parse(req.url,true);
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');
  var queryStringObject = parsedUrl.query;
  var method = req.method.toLowerCase();
  var headers = req.headers;

  res.end('Hello World\n');

  console.log('Request recieved with these headers',headers);
});


server.listen(PORT,function(){
  console.log(`The server is listening on port ${ PORT } now`);
});


/*
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
        }));
    });
  }

  async function runThings() {
    let vidURL = 'https://www.youtube.com/watch?v=hAIMjoAChuY'
    let vidURL1 ='https://www.youtube.com/watch?v=M3IGrj7g0fA&list=RDddJiP3jRVJ8'
      console.log('Attempting download of:',vidURL)
      const data = JSON.parse(await makeRequest(vidURL));

      console.log('File uploaded...')
      const dlURL = await data.download_url
      console.log(dlURL)
  }

runThings();
*/
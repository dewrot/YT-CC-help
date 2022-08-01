//const fs = require('fs');
//const ytdl = require('ytdl-core');
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
/*
ytdl('https://www.youtube.com/watch?v=Vlnl0v3jayU', { filter: 'audioonly'})
  .pipe(fs.createWriteStream('video.mp3'));
*/

import fetch from 'node-fetch'
import pkg from 'node-fetch'
import pkg2 from 'node-fetch'
import pkg3 from 'node-fetch'
import pkg4 from 'node-fetch'
import pkg5 from 'node-fetch'
import pkg6 from 'node-fetch'


const { Blob } = pkg;
const { blobFrom } = pkg2;
const { blobFromSync } = pkg3;
const { File } = pkg4;
const { fileFrom } = pkg5;
const { fileFromSync } = pkg6;

async function postFile(){
  const mimetype = 'text/plain'
  const blob = pkg6('test.txt', mimetype)
  const url = 'https://tempfiles.ninja/api/upload'
  const response = await fetch(url, { method: 'POST', body: blob })
  const data = await response.json()
  console.log(data.download_url)
};

postFile();
import fs from'fs'
import ytdl from 'ytdl-core'
import fetch from 'node-fetch'

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

async function getVideo() {
    ytdl('https://www.youtube.com/watch?v=yxu0qHbG_2c', { filter: 'audioonly'})
      .pipe(fs.createWriteStream('video.mp3'))
};

async function postFile(){
    const mimetype = 'audio/mpeg'
    const blob = await fs.promises.readFile('./video.mp3')
    const url = 'https://tempfiles.ninja/api/upload'
    const response = await fetch(url, { method: 'POST', body: blob, headers: { "Content-Type": mimetype } })
    const data = await response.json()
    
    console.log(data.download_url)
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));
async function runThings() {
    getVideo()
    await delay(20000);
    console.log('Waited 20 seconds so file can download...')
    postFile()
};

runThings();

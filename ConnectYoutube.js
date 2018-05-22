
var request = require('request');
var ACCESS_TOKEN = 'AIzaSyAOtboeuzSHUJA8Uq8vB2vxQQO24yyloNo';
function GetObjectYoutube() {
  request.get('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoSyndicated=true&videoEmbeddable=true&safeSearch=strict&maxResults=10&order=date&channelId=UCXF4WjTCUQSmGapnNEZzbYw&key=' + ACCESS_TOKEN, function(err, header, body) {
  if (err)
    console.log(err);
  console.log(body);});}
setInterval(GetObjectYoutube, 2000);

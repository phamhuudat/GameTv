
var events = require('events');
//var eventEmitter = new events.EventEmitter();
var url = require('./DemoUrl.js');
//UCCIYZ5cZ0V6Mx_DRGsRhzeA - GametV
// x`
var ACCESS_TOKEN = 'AIzaSyAOtboeuzSHUJA8Uq8vB2vxQQO24yyloNo';
var urlPesTv="https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&type=video&eventType=live&maxResults=50&channelId=UC8QbPivxASef0O1rCmCzxYg&key="+ACCESS_TOKEN;
var urlLienMinhAgenna="https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&type=video&eventType=live&maxResults=50&channelId=UCHKuLpFy9q8XDp0i9WNHkDw&key="+ACCESS_TOKEN;
var urlLienQuanGameTv="https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&type=video&eventType=live&maxResults=50&channelId=UCl5QoHQVENUl7ZyPQlC3CaA&key="+ACCESS_TOKEN;
var urlLienQuanAgenna="https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&type=video&eventType=live&maxResults=50&channelId=UCpnQwjzvDm1MOMtZV2zkVpA&key="+ACCESS_TOKEN;
var urlAoeGamtTv="https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&type=video&eventType=live&maxResults=50&channelId=UC9xqfxrfffeuVxXKhUZaeUA&key="+ACCESS_TOKEN;

//Thêm phần chức năng
 function CheckNotification() {
      url.GetObjectYoutube(urlAoeGamtTv,'icon')
      .then(function (list) {
    	url.GetObjectYoutube(urlLienQuanAgenna,'icon');})
      .then(function (list) {
    	url.GetObjectYoutube(urlLienQuanGameTv,'icon');})
      .then(function (list) {
    	url.GetObjectYoutube(urlLienMinhAgenna,'icon');})
      .then(function (list) {
    	url.GetObjectYoutube(urlPesTv,'icon');
    });
}
setInterval(CheckNotification,60000);

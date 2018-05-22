var connectMysql=require('./DemoMysql.js');
var OneSignal=require('./OneSignal.js');
var myClient=require('./OneSignalConnect.js');
var Promise = require('promise');
var request =require('request');
var asyncTasks=[];
function pushNotification (object,icon) {
		var firstNotification = new OneSignal.Notification({
			contents:{  "en": object.title, "es": object.title}
		});
		firstNotification.setIncludedSegments(['All']);
		firstNotification.setExcludedSegments(['Inactive Users']);
		firstNotification.setParameter('headings', {'en': object.channel, 'es': object.channel});
		firstNotification.setParameter('small_icon', icon);
		firstNotification.setParameter('large_icon', object.image);
		 myClient.sendNotification(firstNotification, function (err, httpResponse, data) {
			if (err) {
				console.log('Something went wrong...');
			} else {
				console.log(data, httpResponse.statusCode);
			}
		});

	};
var LoadApiYoutube={
    GetObjectYoutube:  function (urlViling, icon) {
    	return new Promise(function (resolve, reject) {
    		request.get(urlViling,  function(err, header, body) {
    		if (err){
    		 reject(err);
    		}		
    		else{
    			var listNotification=[];
    			var list=[];
    			var notifi=true;
    			var ObjectLiving = JSON.parse(body);
	             //kiểm tra số lượng kết quả trả về
	             if(ObjectLiving.pageInfo.totalResults!=0){
		            //lấy danh sách các kênh dang stream
		            var ListVideo = ObjectLiving.items;
		            console.log(ListVideo.length);
		            //lấy từng phần tử trong danh sách các kênh đang stream
		            //lấy ra danh sách các tream đã lưu
		            var channel = ListVideo[0].snippet.channelTitle;
		            console.log("kênh có là "+channel);
		            connectMysql.SelectLiving(channel).then(function (result) {
		            	//listChannel= result;
		            	list = result;
		            	console.log("kết quả: "+result.length);
		            for (var i = 0; i < ListVideo.length; i++) {
			           var channel = ListVideo[i].snippet.channelTitle;
			           var idVideo = ListVideo[i].id.videoId;
			           var image = ListVideo[i].snippet.thumbnails.medium.url;
			           var object={'id':idVideo, 'title':ListVideo[i].snippet.title, 'channel':channel, 'image':image};

			           var insert=  connectMysql.InsertLiving(object);
			            insert.then(function () {
			            console.log("notification: "+listNotification.length);
			           	listNotification.push(object);
			           	if(listNotification.length!=0){
                             if(notifi){
                             	console.log('pushNotitication ' + list.length);
			       	            pushNotification(listNotification[0],icon);
			       	            list.map(connectMysql.deleteItemChannel);
			       	            notifi=false;
                             }
                         }
			           });    
			       }
			       
			   })
			   }
			 resolve(list);
		    }
		})
    	})
}
};
module.exports=LoadApiYoutube;
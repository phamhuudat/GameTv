var OneSignal = require('./OneSignal.js');
var myClient = new OneSignal.Client({
	userAuthKey:'OTE1Y2YwY2UtMGE1Yy00YjY2LWExODMtYTk2OTYyNDIyZTBh',
	app:{appAuthKey:'MmI3ZjBlN2MtOTBkMC00ZDY2LTg1ZWQtZWE4MDNiZjhlODgy', appId:'eadafe51-07a5-4227-afc9-90445e497be4'}
});
module.exports= myClient;
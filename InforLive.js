var ConnectSqlite = {
    //nhúng các node vào file js
    sqlite3:require('sqlite3').verbose(),
    fs:require('fs'),
    dbFile:'./Living.db',
    dbSqlite:null,

	// lấy kết nối db
	db: function () {
		var dbExists = this.fs.existsSync(this.dbFile);
		if(!dbExists){
			this.fs.openSync(this.dbFile, 'w');
		}
		//if(this.dbSqlite==null){
			this.dbSqlite = new this.sqlite3.Database(this.dbFile,(err) => {
			if (err) {
				return console.error(err.message);
			}
			console.log('Connected to the in-memory SQlite database.');
		});
		 //}
		this.dbSqlite.run('CREATE TABLE if not exists inforLive (id TEXT, title TEXT, channel TEXT)');
			//console.log('Giờ mới tạo bảng');
			return this.dbSqlite;
		},
	//thêm một đối tượng vào bảng
	createLiving: function(object) {
		var statement = this.db().prepare('INSERT INTO inforLive(id,title,channel) VALUES (?, ?, ?)');
		console.log(object.id+' '+object.title+' '+object.channel);
		statement.run(object.id, object.title, object.channel);
		statement.finalize();
		this.closeDb();
	},
	deleteItemChannel:function (channel) {

		var sql='DELETE FROM inforLive WHERE id=?';
		this.db().run(sql,channel.id,function (err) {
			if(err){
				return console.error('lỗi: '+err.message);
			}
			console.log('delete complete');
		});
	},
	//lấy ra đối tượng với id
	getListChannel:function(channel)  {
		var listChannel=[];
		var sql='SELECT* FROM inforLive where channel='+'\''+channel+'\'';
		this.db().each(sql,(err,row)=>{
			if(err){
				console.log('ngu người');
				return null;
			}
			listChannel.push({'id':row.id,
			'title':row.title, 'channel':row.channel});
			console.log(listChannel.length);
		});
		this.closeDb();
		console.log(listChannel.length);
		return listChannel;
	},
	closeDb:function () {
		this.db().close((err) => {
			if (err) {
				return console.error(err.message);
			}
			console.log('Close');});
	}

}
module.exports= ConnectSqlite;




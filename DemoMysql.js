
var listChannel=[];
var Promise = require('promise');
var mysql = require('mysql');
var con;
var Connect=function () {
		return new Promise(function (resolve, reject) {
		con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "1234",
			database:"gamtv"
		});
		con.connect(function(err) {
			if (err) reject(err);
			//("Connected")
			console.log("Connected!");
			resolve('Connected');
		})
	});	}
var Close = function () {
	con.end(function(err) {
	if(err){
	return console.error(err.message);
	}
	console.log("Close!");
	})
};
var connectDb= {
	CreateDb:function () {
		Connect();
		con.query("CREATE DATABASE gamtv",function (err, result) {
			if(err)  console.error(err.message);
			else
			console.log("Database created");
		});
		Close();
	},
	InsertLiving: function (object) {
		return new Promise(function (resolve, reject) {
			Connect();
			var sql="INSERT INTO tb_living(id,title,channel) VALUES (?,?,?)";
		    var inserts=[object.id, object.title, object.channel];
		    sql= mysql.format(sql, inserts);
			con.query(sql, function (err, result) {
			if(err) {
				console.log(err.message)
				 reject(err);
			}
			console.log("đã thêm vào database");
			resolve(true);
		});
			Close();
		})
	},
	SelectLiving: function (channel) {
		    return new Promise(function (resolve, reject) {
		    	Connect();
	    	    var sql='SELECT* FROM tb_living where channel=?';
		        var insert=[channel];
		        sql = mysql.format(sql, insert);
		        var list=[];
		    	con.query(sql,function (err, result, fields) {
			    if(err) {
				   console.log(err.message)
				   reject(err);
			    }
			    else {
			       console.log("đã lấy dữ liệu");
			       for (var i = 0; i < result.length; i++) {
			       	  list.push({'id':result[i].id,'title':result[i].title, 'channel':result[i].channel})
			       }
			       resolve(list);
			    }
		    });
				 Close();
		})
	},
	deleteItemChannel:function (object) {
        return new Promise(function (resulve, reject) {
        Connect();
		var sql = "DELETE FROM tb_living WHERE id =?";
		var insert=[object.id];
		sql= mysql.format(sql, insert);
		con.query(sql, function (err, result) {
			if (err){
				console.error(err);
			}
			else {
				console.log("Number of records deleted: " + result.affectedRows);
			}
		});
		Close();
	  })
	}

}
module.exports = connectDb;

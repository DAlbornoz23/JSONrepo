
var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');

const json_f = path.join(__dirname+"/JSONfiles");

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
function ReadFiles(){
	try{
	fs.readdir(json_f,(err,files)=>{
	if(err){
		return console.error(err);
	}
	files.forEach(function(file,index){
		if (file.includes(".json")){
			SendApp(file);
		}
	})
});
}catch(e){ console.error(e);}
}

ReadFiles();

app.set('json spaces', 40);
function SendApp(file){
app.get("/",function(req,res){
	var file_path =json_f+'/'+file; 
	fs.readFile(file_path, function (err,data){
	if (err){
		return console.error(err);
	}
	res.json(JSON.parse(data));


	});
});
}


app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
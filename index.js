
var express = require('express');
var fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
var app = express();

const json_f = "./JSONfiles";

app.set('views',path.join(__dirname,"view"));
app.set('view engine','pug');
app.set('json spaces', 40);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extendend:false}));

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 5000;
let archivos=[];

function ReadFiles(){
	try{
	fs.readdir(json_f,(err,files)=>{
	if(err){
		return console.error(err);
	}
	files.forEach(function(file,index){
		if (file.includes(".json")){
			SendApp(file);
			archivos.push(file);
		}
	})
});
}catch(e){ console.error(e);}
}

ReadFiles();


app.get("/",function(req,res){
	res.render("index.pug",{"title": "JSON Rest API", "items": archivos});

})



function SendApp(file){
app.get(`/${file}`,function(req,res){
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

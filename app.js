const express = require("express");

const https = require("https");

const bodyParser =require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req , res){
	res.sendFile(__dirname +"/index.html");
	
	
});

app.post("/", function(req ,res){
	 const query = req.body.cityName;
	const apiKey ="eab474d7470dcca97628afdb02b04fcc";
	const unit ="metric";
	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&unit=" + unit ;
	
	https.get(url, function(response){
	console.log(response.statusCode);
	
	
	response.on("data" ,function(data){			
	const weather =	JSON.parse(data);
	const temp = weather.main.temp;
	
	const description = weather.weather[0].description;
	
	const icon = weather.weather[0].icon;
	const imgUrl ="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
	res.write("<p> weather : " + description +"</p>");
	res.write("<h1> temp "+ query +" is " + temp + " degree </h1>");
	res.write("<img src ="+imgUrl+">");
	res.send();
	});
	
		
	}) ;
	
	
});

    
app.listen(3000,function(){
	console.log("server is running on port 3000");
	
})



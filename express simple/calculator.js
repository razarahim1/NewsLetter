const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}))

const link = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Islamabad&appid=ec61a1179f4c50cf429d27ac9baf677d"



app.get("/" ,function(req,res){  
    // res.sendFile(__dirname+"/index.html");
https.get(link, (response) => {

    const { statusCode } = response;
    response.on("data", function(data){
        const weatherdata = JSON.parse(data);
        // console.log(JSON.parse(data))
        const temp = weatherdata.main.temp;
        console.log(temp);
        res.send("Temperature is " + temp + "°C in Islamabad.");
    })
  });
})

app.get(link,function(req,res){
    console.log("here");
});



app.post("/multiply", function(req,res){
    req.sendFile(__dirname)
})

app.get("/home",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname+"/bmiCalculator.html");
})

app.post("/bmicalculator", function(req, res){
    const weight = Number(req.j.weight);
    const height = Number(req.body.height);

    const result = weight / (height * height);

    res.send("BMI is = "+result);
})

app.post("/", function(req, res){
    const n1 = Number(req.body.num1);
    const n2 = Number(req.body.num2); 
    const result = n1 + n2;
    res.send("Addition is "+ result);
})


app.listen(3100, function(){
    console.log("Server started at port 3000");
});

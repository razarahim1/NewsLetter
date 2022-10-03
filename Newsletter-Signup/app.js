const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/failure",(req,res)=>{
    res.redirect("/")
})

app.post("/",(req,res)=>{

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    var data = {
        members:[
            {
                email_address : email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/00e83ec27a"

    const options = {
        method : "POST",
        auth: "we:6879237b9bca3a98974e73e109c939c7-us17"
    }
    const request  =  https.request(url, options, (response)=>{
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/sucess.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data",data=>{
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

    console.log(firstName + " " + lastName + " " + email)
})

// 6879237b9bca3a98974e73e109c939c7-us17
//00e83ec27a


app.listen(process,env.PORT || 3000,function(){
    console.log("Server is running on port 3000")
})

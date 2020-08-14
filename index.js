const request = require("request")
var moment = require('moment');

var express = require('express')
var app = express()

app.use(express.json())

const url ="http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=4f885840f48d611241e7b5da9a5c6752"

app.get('/weatherinfo',async(req,res)=>{
    try{
        
        const options = {
            url: url,
            method: 'GET',
        };
        
       await request(options, function(err, data, body) {
           let  json = JSON.parse(body);
             let todaysDate = new Date();
             const date= todaysDate.getDate()
             var flag=false;
             console.log("first json",json)
             for(var i=2;i<date;i++){
                 if(date%i==0){
                     flag=true;
                 }
             }
             if(flag){
                 res.send('Date is not prime so no dat')
             } else{
                 res.send(json)
             }
        });
       
    }catch(e){
        res.status(400).send(e)
    }
})


const port = process.dev || 3000;
app.listen(port,(error,response)=>{
    if(error){
      return  console.log("cannot connect to the port")
    }
    console.log("Serving on port",port)
});
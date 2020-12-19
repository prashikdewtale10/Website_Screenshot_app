const express = require('express');
const app = express();
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var request = require('request');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/form.html'));
    res.end()
});
app.post('/add',(req,res)=>{
    
    console.log(req.body.url,req.body.width,req.body.height,req.body.full,req.body.fresh)
    if(req.body.full=='on')
    {
        console.log('true')
        const full=true;
    }else{
        console.log('false')
        const full=false;
    }
    if(req.body.fresh=='on')
    {
        console.log('true')
        const fresh=true;
    }else{
        console.log('false')
        const fresh=false;
    }

// The parameters.
var token = 'YOUR_TOKEN_PROVIDED_BY_API';
var url = encodeURIComponent(req.body.url);
var width = req.body.width;
var height = req.body.width;
var output = 'image';


// Create the query URL.
var query = "https://screenshotapi.net/api/v1/screenshot";
query += `?token=${token}&full_page=${req.body.full=='on'}&fresh=${req.body.fresh=='on'}&url=${url}&width=${width}&height=${height}&output=${output}`;

// Call the API and save the screenshot.
request.get({url: query, encoding: 'binary'}, (err, response, body) => {
    fs.writeFile("screenshot.png", body, 'binary', err => {
        if (err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
});

res.send(req.body.url)
res.end()
})
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port,()=>{
    console.log('server running')
})

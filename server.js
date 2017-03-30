var express = require('express');

var app = express();


app.get('/welcome', function(req, res){
        res.send('Hello World');
});


app.listen('8080', function(){
    console.log('server is running to port: 3000');
})

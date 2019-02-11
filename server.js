//Express start from folder
var express = require('express');

var load = function(folder,port) {
    var app = express();
    app.use(express.static(__dirname + folder));
    app.listen(port);
    console.log("Server 'AppRecorder_Demo" +  folder + " running on port " + port);
};

load("/www", 7777);

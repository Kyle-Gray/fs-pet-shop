'use strict';

var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');


app.use(express.static('public'));

app.get('/pets', function(req,res){
  fs.readFile(petsPath, 'utf8', function(err,data){
    var pets = JSON.parse(data);
  res.send(pets);
  });
});

app.get('/pets/:id', function(req, res) {
  var id = Number.parseInt(req.params.id);
  fs.readFile(petsPath, 'utf8', function(err,data){
    var pets = JSON.parse(data);
  if (Number.isNaN(id) || id < 0 || id >= pets.length) {
    return res.sendStatus(404);
  }

  res.send(pets[id]);
  });
});


app.listen('3000', function(){
  console.log("Listening on port 3000");
});

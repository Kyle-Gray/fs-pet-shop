'use strict';

var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var morgan = require('morgan');
app.use(morgan('short'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

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

app.post("/pets", function(req, res) {
  var pet = req.body;
  var name = pet.name;
  var age = Number.parseInt(pet.age);
  var kind = pet.kind;
  if (!age || !kind || !name) {
    res.sendStatus(404);
  }

  fs.readFile(petsPath, 'utf8', function(err,data){
    var pets = JSON.parse(data);
    pets.push(pet);
    var petsJSON = JSON.stringify(pets);
    if (err) {
      throw err;
    }
    fs.writeFile(petsPath, petsJSON,  function(writeErr){
      if (writeErr) {
        throw writeErr;
      }
    });
  });
  res.send(pet);
});

app.put('/pets/:id', function(req, res) {
  var id = Number.parseInt(req.params.id);
  var pet = req.body;
  var name = pet.name;
  var age = Number.parseInt(pet.age);
  var kind = pet.kind;
  if (!age || !kind || !name) {
    res.sendStatus(404);
  }

  fs.readFile(petsPath, 'utf8', function(err,data){
    var pets = JSON.parse(data);
    pets[id]= pet;
    var petsJSON = JSON.stringify(pets);
    if (err) {
      throw err;
    }
    fs.writeFile(petsPath, petsJSON,  function(writeErr){
      if (writeErr) {
        throw writeErr;
      }
    });
  });
  res.send(pet);
});


app.delete('/pets/:id', function(req, res) {
  var id = Number.parseInt(req.params.id);
  var pet = req.body;

  fs.readFile(petsPath, 'utf8', function(err,data){
    var pets = JSON.parse(data);
    pet = pets.splice(id, 1)[0];
    var petsJSON = JSON.stringify(pets);
    if (err) {
      throw err;
    }
    fs.writeFile(petsPath, petsJSON,  function(writeErr){
      if (writeErr) {
        throw writeErr;
      }
      res.send(pet);
    });
  });
});


app.listen('3000', function(){
  console.log("Listening on port 3000");
});

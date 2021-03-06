'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
    fs.readFile(petsPath, 'utf8', function(err, data) {
        var pet = process.argv[3];
        var pets = JSON.parse(data);
        if (pet) {
            if (isNaN(pet) || pet > pets.length || pet < 0) {
                console.error(`Usage: ${node} ${file} read INDEX`);
                process.exit(1);
            }
            console.log(pets[pet]);
        } else {
            console.log(pets);
        }
    });
} else if (cmd === 'create') {
  var age = Number.parseInt(process.argv[3]);
  var kind = process.argv[4];
  var name = process.argv[5];
  if (!age || !kind || !name) {
    console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
    process.exit(1);
  }
    fs.readFile(petsPath, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }
        else {
            var pets = JSON.parse(data);
            var createPet = {
                age: age,
                kind: kind,
                name: name
            };
            pets.push(createPet);
            var petsJSON = JSON.stringify(pets);

            fs.writeFile(petsPath, petsJSON, function(writeErr) {
                if (writeErr) {
                    throw writeErr;
                }
                console.log(createPet);
            });
        }
    });
} else if (cmd === 'update') {
    fs.readFile(petsPath, 'utf8', function(err, data) {
        var index = process.argv[3];
        var age = process.argv[4];
        var kind = process.argv[5];
        var name = process.argv[6];
        if (err) {
            throw err;
        }
        var pets = JSON.parse(data);
        if (!index || !age || !kind || !name) {
            return console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
        } else {
            var updatePet = {
                age: age,
                kind: kind,
                name: name
            };
            pets[index].push(updatePet);
            var petsJSON = JSON.stringify(pets);

            fs.writeFile(petsPath, petsJSON, function(writeErr) {
                if (writeErr) {
                    throw writeErr;
                }
                console.log(updatePet);
            });
        }
    });
}
else if(cmd === 'destroy'){
  var index = process.argv[3];

  if(!index){
    return console.error(`Usage: ${node} ${file} destroy INDEX`);
  }
  fs.readFile(petsPath, 'utf8', function(err,data){
    var pets = JSON.parse(data);
    var pet = pets.splice(index, 1)[0];
    var petsJSON = JSON.stringify(pets);
    if (err) {
      throw err;
    }
    fs.writeFile(petsPath, petsJSON,  function(writeErr){
      if (writeErr) {
        throw writeErr;
      }
      console.log(pet);
    });
  });}
else {
    console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
    process.exit(1);
}

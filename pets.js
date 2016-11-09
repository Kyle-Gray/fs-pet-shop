'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var pet = process.argv[3];
var age = process.argv[4];
var kind = process.argv[5];
var name = process.argv[6];

if (cmd === 'read'){
  fs.readFile(petsPath, 'utf8', function(err, data) {
    var pets = JSON.parse(data);
      if (err) {
        throw err;
      }
      else if (pet === undefined) {
        console.log(pets);
        process.exit(1);
      }


      if(pet > pets.length || pet < 0){
        console.error(`Usage: ${node} ${file} read INDEX`);
        process.exit(1);
      }
      console.log(pets[pet]);

    });
  }
else if(cmd === 'create'){
  fs.readFile(petsPath, 'utf8', function(readErr, data){
    if (readErr) {
      throw readErr;
    }
    var pets = JSON.parse(data);

  })

}else if(cmd === 'update'){

}else if(cmd === 'destroy'){

}else{
  console.log(`Usage: ${node} ${file} [ read | create | update | destroy ]`);
  process.exit(1);
}

var metadata = require('react-component-metadata');
var fs = require('fs');
var dir = require('node-dir');

var options = { mixins: true };
var results = {};

dir.readFiles('./src/js/components/', function(err, component, next) {
  if (err) throw err;

  var data = metadata(component, options);
  var name = Object.keys(data)[0];

  results[name] = data[name];
  next();
}, function (err, files) {
  if (err) throw err;

  fs.writeFile('_test.json', JSON.stringify(results), function (err) {
    if (err) throw err;
    console.log("It's saved!");
  });
});


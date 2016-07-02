var bodyParser = require('body-parser');
var express = require('express');
var pythonShell = require('python-shell');

var app = express();

app.use(bodyParser.json());

var port = parseInt(process.env.PORT, 10) || 8080;

// Express route for any other unrecognised incoming requests
app.get('*', function(req, res) {
  res.status(404).send('Unrecognized API call');
});

app.put('/leds', function(req, res) {
  res.status(501).send('Not yet implemented');
  /*res.send(JSON.stringify([]));
  console.log(JSON.stringify(req.body));

  console.log('Type of body is: ' + typeof(req.body));
  console.log('Body length is: ' + req.body.length);

  if (req.body.length > 0) {
    pythonShell.run('scripts/solid.py', function(err) {
      if (err) {
        console.log(err);
      }
    });
  } else {
    pythonShell.run('scripts/clear.py', function(err) {
      if (err) {
        console.log(err);
      }
    });
  }*/
});

app.post('/solidcolor', function(req, res) {
  // Grab parameter values
  var red = req.param('red');
  var green = req.param('green');
  var blue = req.param('blue');

  // Set up parameters for python script
  var params = {
    args: [red, green, blue]
  };

  // Run LED script
  pythonShell.run('scripts/solid.py', params, function(err, results) {
    if (err) {
      res.send(err);
    } else {
      res.send("Red: " + red + " Green: " + green + " Blue: " + blue);
    }
  });
});

// Express route to handle errors
app.use(function(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
});

app.listen(port);
console.log('App Server running at port ' + port);

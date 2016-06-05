var bodyParser = require('body-parser');
var express = require('express');

var app = express();

app.use(bodyParser.json());

var port = parseInt(process.env.PORT, 10) || 8080;

// Express route for any other unrecognised incoming requests
app.get('*', function(req, res) {
  res.status(404).send('Unrecognized API call');
});

app.put('/leds', function(req, res) {
  res.send(JSON.stringify([]));
  console.log(JSON.stringify(req.body));
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

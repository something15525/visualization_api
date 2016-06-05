var bodyParser = require('body-parser');
var express = require('express');

var app = express();

app.use(bodyParser.json());

var port = parseInt(process.env.PORT, 10) || 8080;

var inputs = [{ pin: '11', gpio: '17', value: 1 },
              { pin: '12', gpio: '18', value: 0 }];

// Express route for incoming requests for a customer name
app.get('/inputs/:id', function(req, res) {
  res.status(200).send(inputs[req.params.id]);
}); 

// Express route for any other unrecognised incoming requests
app.get('*', function(req, res) {
  res.status(404).send('Unrecognised API call');
});

app.put('/leds', function(req, res) {
  res.send('Got the following req: ' + JSON.stringify(req.body));
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

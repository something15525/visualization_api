/* Copyright 2016 Michael Limb (something15525@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var bodyParser = require('body-parser');
var express = require('express');
var pythonShell = require('python-shell');

var app = express();

/**
 * This variable is used by the solidcolor endpoint to determine
 * whether or not the colors should be shown on the LEDS.
 */
var shouldShowColors = false;

/**
 * Used to hold the current color RGB triple used by the solidcolor API.
 */
var currentColors = [];

app.use(bodyParser.json());

var port = parseInt(process.env.PORT, 10) || 8080;

function updateColors(res) {
    // Set up parameters for python script
    var params = {
      args: currentColors
    };

    pythonShell.run('scripts/solid.py', params, function(err, results) {
      if (err) {
        res.status(500).send({
          "error" : err
        });
      } else {
        res.send({});
      }
    });
}

// Express route for any other unrecognised incoming requests
app.get('*', function(req, res) {
  res.status(404).send('Unrecognized API call');
});

app.post('/color', function(req, res) {
  // Grab parameters
  var showColors = req.param("enabled");

  // Save result
  shouldShowColors = (showColors == 'true');

  // Clear colors out if !shouldShowColors
  if (shouldShowColors) {
      updateColors(res)
  } else {
      pythonShell.run('scripts/clear.py', function(err) {
          if (err) {
              res.status(500).send({
                  "error" : err
              });
          } else {
              res.send({});
          }
      });
  }
});

app.post('/solidcolor', function(req, res) {
  // Grab parameter values
  var red = req.param('red');
  var green = req.param('green');
  var blue = req.param('blue');

  // Update current colors
  currentColors = [red, green, blue];

  // Run LED script
  if (shouldShowColors) {
      updateColors(res);
  }
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

const express = require('express');

var app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found',
    name: 'Todo App v1.0'
  });
});

// GET /users
app.get('/users', (req, res) => {
  res.send([
    {
      name: 'Edgardo',
      age: 21
    }, {
      name: 'Linus',
      age: 48
    }, {
      name: 'Richard',
      age: 64
    }
  ]);
});

app.listen(3000);

module.exports.app = app;
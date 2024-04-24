// Create web server
var express = require('express');
var app = express();
var fs = require('fs');

// Create a new comment
app.post('/comments', function(req, res) {
  var comment = req.body;
  var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  comments.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.send(comment);
});

// Read all comments
app.get('/comments', function(req, res) {
  var comments = fs.readFileSync('comments.json', 'utf8');
  res.send(comments);
});

// Read a comment
app.get('/comments/:id', function(req, res) {
  var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  var comment = comments[req.params.id];
  res.send(comment);
});

// Update a comment
app.put('/comments/:id', function(req, res) {
  var comment = req.body;
  var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  comments[req.params.id] = comment;
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.send(comment);
});

// Delete a comment
app.delete('/comments/:id', function(req, res) {
  var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  comments.splice(req.params.id, 1);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.send(comments);
});

app.listen(3000);
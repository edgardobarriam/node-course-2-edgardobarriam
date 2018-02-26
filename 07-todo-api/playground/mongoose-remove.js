const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/* Todo.remove({}).then((result) => {
  console.log(result);
}); */

// Todo.findOneAndRemove({});

Todo.findByIdAndRemove('5a81ae5d25b7682f9018d381').then((todo) => {
  console.log(todo);
});
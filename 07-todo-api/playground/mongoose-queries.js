const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
var id = '5a80bb9ea88d9a3d549357d7';

/* if(!ObjectID.isValid(id)) {
  console.log('Id not valid');
} */


/* Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos ', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo ', todo);
}); */

/* Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo  by id', todo);
}).catch((err) => console.log(err)); */

User.findById('5a8057c476314e0b1cca81ad').then((user) => {
  if (!user) {
    return console.log('User not found')
  }
  console.log('User by id ', user);
}).catch((error) => {
  console.log(error);
});
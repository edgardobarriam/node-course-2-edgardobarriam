const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const sampleUsers = [{
  _id: userOneId,
  email: 'edgardo.barriam@gmail.com',
  password: 'UserOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: 'usuario@ejemplo.com',
  password: 'UserTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const sampleTodos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userOneId
  }, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}]


const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(sampleTodos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(sampleUsers[0]).save();
    var userTwo = new User(sampleUsers[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {
  sampleTodos,
  populateTodos,
  sampleUsers,
  populateUsers
};
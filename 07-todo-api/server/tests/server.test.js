/** 
 * Testing dependencies.
*/

const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {sampleTodos, populateTodos, sampleUsers, populateUsers} = require('./seed/seed');

/**
 * Prepare sample data for testing purposes.
 */

beforeEach(populateUsers);
beforeEach(populateTodos);

/**
 * Tests collection related to POST /todos route
 */

describe('POST /todos', () => {

  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .set('x-auth', sampleUsers[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
         return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => done(err));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .set('x-auth', sampleUsers[0].tokens[0].token)
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
       return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((err) => done(err));
    });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .set('x-auth', sampleUsers[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(1)
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${sampleTodos[0]._id.toHexString()}`)
      .set('x-auth', sampleUsers[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(sampleTodos[0].text);
      })
      .end(done);
  });

  it('should not return todo doc created by other user', (done) => {
    request(app)
      .get(`/todos/${sampleTodos[1]._id.toHexString()}`)
      .set('x-auth', sampleUsers[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return a 404 if todo not found', (done) => {
    var fakeID = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${fakeID}`)
      .set('x-auth', sampleUsers[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return a 404 for non object ids', (done) => {
    request(app)
      .get('/todos/123')
      .set('x-auth', sampleUsers[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
})

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexID = sampleTodos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .set('x-auth', sampleUsers[1].tokens[0].token)
      .expect(200)
      .expect((response) => {
        expect(response.body.todo._id).toBe(hexID);
      })
      .end((error, response) => {
        if (error) {
          done(error);
        }

        Todo.findById(hexID).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((error) => {
          done(error);
        });
      });
  });

  it('should not remove a todo created by other user', (done) => {
    var hexID = sampleTodos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .set('x-auth', sampleUsers[1].tokens[0].token)
      .expect(404)
      .end((error, response) => {
        if (error) {
          done(error);
        }

        Todo.findById(hexID).then((todo) => {
          expect(todo).toBeTruthy();
          done();
        }).catch((error) => {
          done(error);
        });
      });
  });

  it('should return 404 if todo not found', (done) => {
    var fakeID = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${fakeID}`)
      .set('x-auth', sampleUsers[1].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if ObjectID is invalid', (done) => {
    request(app)
    .delete('/todos/123')
    .set('x-auth', sampleUsers[1].tokens[0].token)
    .expect(404)
    .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) =>{
    var id = sampleTodos[0]._id.toHexString();
    var newText = 'Update todo';
    request(app)
      .patch(`/todos/${id}`)
      .set('x-auth', sampleUsers[0].tokens[0].token)
      .send({
        text: newText,
        completed: true
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.todo.text).toBe(newText);
        expect(response.body.todo.completed).toBe(true);
        expect(typeof response.body.todo.completedAt).toBe('number')
      })
      .end(done);
  });

  it('should not update todo created by other user', (done) =>{
    var id = sampleTodos[0]._id.toHexString();
    var newText = 'Update todo';
    request(app)
      .patch(`/todos/${id}`)
      .set('x-auth', sampleUsers[1].tokens[0].token)
      .send({
        text: newText,
        completed: true
      })
      .expect(404)
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var id = sampleTodos[1]._id.toHexString();
    var newText = 'Update todo';
    request(app)
      .patch(`/todos/${id}`)
      .set('x-auth', sampleUsers[1].tokens[0].token)
      .send({
        text: newText,
        completed: false
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.todo.text).toBe(newText);        
        expect(response.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });
});

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', sampleUsers[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(sampleUsers[0]._id.toHexString());
        expect(res.body.email).toBe(sampleUsers[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'example@example.com';
    var password = '123mnb!'

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();    
        expect(res.body._id).toBeTruthy();    
        expect(res.body.email).toBe(email);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }

        User.findOne({email}).then((user) => {
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        }).catch((error) => done(error));
      });
  });

  it('should return validation errors if request invalid', (done) => {
    request(app)
      .post('/users')
      .send({
        email: 'aaaaa...',
        password: '1bm'
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if email is in use', (done) => {
    request(app)
    .post('/users')
    .send({
      email: sampleUsers[0].email, // Email already in use
      password: '123654789'
    })
    .expect(400)
    .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login and return auth token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: sampleUsers[1].email,
        password: sampleUsers[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        User.findById(sampleUsers[1]._id).then((user) => {
          expect(user.toObject().tokens[1]).toMatchObject({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((error) => done(error));
      });
  });

  it('should reject invalid login', (done) => {
    request(app)
    .post('/users/login')
    .send({
      email: sampleUsers[1].email,
      password: 'asdasd123'
    })
    .expect(400)
    .expect((res) => {
      expect(res.headers['x-auth']).toBeFalsy();
    })
    .end((error, res) => {
      if (error) {
        return done(error);
      }

      User.findById(sampleUsers[1]._id).then((user) => {
        expect(user.tokens.length).toBe(1);
        done();
      }).catch((error) => done(error));
    });
  });
});

describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', (done) => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', sampleUsers[0].tokens[0].token)
      .expect(200)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        User.findById(sampleUsers[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((error) => done(error));
      });
  });
});
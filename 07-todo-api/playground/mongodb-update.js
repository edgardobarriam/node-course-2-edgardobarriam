// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // Similar a la linea anterior, pero múltiple

MongoClient.connect('mongodb://localhost:27017/', (error, client) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  /* db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5a7f21543a8ac50b08e50395')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  }); */

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a7f1555b39585076873b58c')
  }, {
    $set: {
      name: 'Edgardo'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  //client.close(); 
});
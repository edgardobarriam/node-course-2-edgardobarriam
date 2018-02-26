// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // Similar a la linea anterior, pero múltiple

MongoClient.connect('mongodb://localhost:27017/', (error, client) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  
  const db = client.db('TodoApp');

  /* db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo. ', err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
  }); */
  
/*   db.collection('Users').insertOne({
    name: 'Edgardo',
    age: 21,
    location: 'Puerto Montt'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo. ', err);
    }

    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  });*/


  client.close(); 


});
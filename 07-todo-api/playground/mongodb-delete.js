// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // Similar a la linea anterior, pero múltiple

MongoClient.connect('mongodb://localhost:27017/', (error, client) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // deleteMany
  /* db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    console.log(result);
  }); */

  // deleteOne
  /* db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    console.log(result);
  }); */

  //findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) =>{
    console.log(result);
  });

  db.collection('Users').deleteMany({name: 'Edgardo'});

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5a7f17c569cabd286c2c3f0b')
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });

  //client.close(); 
});
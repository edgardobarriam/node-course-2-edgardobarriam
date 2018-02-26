// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // Similar a la linea anterior, pero múltiple

MongoClient.connect('mongodb://localhost:27017/', (error, client) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

/*   db.collection('Todos').find({
    _id: new ObjectID('5a7f21543a8ac50b08e50395')
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos ', err);
  }); */

  /* db.collection('Todos').find().count().then((count) => {
   console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch todos ', err);
  });  */

  db.collection('Users').find({name: 'Edgardo'}).toArray().then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
   }, (err) => {
     console.log('Unable to fetch todos ', err);
   }); 

  //client.close(); 


});
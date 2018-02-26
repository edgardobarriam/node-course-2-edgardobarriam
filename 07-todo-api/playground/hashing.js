const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// bcrypt example
var password = '123abc!';
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    bcrypt.compare('123abc!', hash, (err, result) => {
      console.log(hash);
      console.log(result);
    });
  });
});


/* var data = {
  id: 10,
};

var token = jwt.sign(data, '123abc');
console.log(token);


var decoded = jwt.verify(token,'123abc');
console.log('decoded', decoded); */

/* // Hashing example
var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);




// User data
var data = {
  id: 4,
};

// Server returns a token to the user
var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

// User tries to "hack" by changing his ID and token hash
token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString(); // User tries to create the token by himself, but he doesn't have the salt (man in the middle)


// Server creates the hash according to user's data
var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();


if (resultHash ===  token.hash) {
  console.log('Data was not corrupted');
} else {
  console.log('Data is corrupted!!!!!');
} */


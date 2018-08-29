const moment = require('moment');

var date = moment();
date.add(1,'year').subtract(2,'months');
console.log(date.format('MMM Do, YYYY'));

var hora = moment();

console.log(hora.format('HH:mm'));
console.log(hora.format('h:mm a'));
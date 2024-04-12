// arguments is array in JS contain all the values that were passed into　a func
// prove that all the coee inside a moudle is wrapped, have to access to these variable(arg)
console.log(arguments);

// show wrapped func
console.log(require('module').wrapper);

// module.exports
const C = require('./test-module-1');

const cal1 = new C;

console.log(cal1.add(2, 5));
console.log(cal1.multiply(2, 5));
console.log(cal1.divide(2, 5));

console.log('=======================');

// exports
// const cal2 = require('./test-module-2'); // object contain all properties
// console.log(cal2.multiply(2, 5));

const { add, multiply, divide } = require('./test-module-2');
console.log(add(2, 5));

// caching
// only loaded once
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();


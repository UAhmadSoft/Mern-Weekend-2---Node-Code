// let myVar = 22;
// const apple = require('./sum');
// console.log('apple(2, 3)', apple(2, 3));

const calculator = require('./calculator');
const { sum, multiply, divide, subtract } = require('./calculator');

console.log('calculator.sum(2, 3)', calculator.sum(2, 3));
console.log('calculator.multiply(2, 3)', calculator.multiply(2, 3));
console.log('calculator.divide(2, 3)', calculator.divide(2, 3));
console.log('calculator.subtract(2, 3)', calculator.subtract(2, 3));

console.log('sum(2, 3)', sum(2, 3));
console.log('multiply(2, 3)', multiply(2, 3));
console.log('divide(2, 3)', divide(2, 3));
console.log('subtract(2, 3)', subtract(2, 3));

// console.log('app');

// let person = {
//   name: 'John',
//   age: 22,
//   getName: function () {
//     console.log('this', this);
//     return this.name;
//   },
// };

// person.getName();

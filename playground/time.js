var moment = require('moment');

// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());

// var date = moment();
// //
// // date.add(100, 'year').subtract(9, 'months');
// //
// // console.log(date.format('MMM Do, YYYY'));
//
// // 10:35 am
//
// console.log(date.format('h:mm a'));

var createdAt = 1234;

var date = moment(createdAt);

console.log(date.format('h:mm a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

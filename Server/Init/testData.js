const mongoose = require('mongoose');
const Task = require('../Models/task');

main()
  .then(res => console.log('Connected Sucessfully to Database',))
  .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Todo');
}

const tasks = [
    {
        message:'Write a assignment file',
        createdOn: Date.now(),
    },
    {
        message:'Prepare for test in Database',
        createdOn: Date.now(),
    },
    {
        message:'Have to go for Shopping',
        createdOn: Date.now(),
    },
]
Task.insertMany(tasks)
.then( data => console.log(data))
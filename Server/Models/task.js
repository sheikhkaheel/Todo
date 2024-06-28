const mongoose = require('mongoose');

main()
  .then(res => console.log('Connected Sucessfully to Database',))
  .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Todo');
}

const Schema =  mongoose.Schema;

const taskSchema = new Schema({
    message:{
        type:String,
        required:true
    },
    CreatedOn:{
        type:Date,
        default:Date.now()
    }
})

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;
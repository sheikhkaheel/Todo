const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const Task = require('./Models/task');

app.use(cors());
app.use(express.json());

main()
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Todo');
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Listening on port 8000')
})

// Get all tasks Api
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
})

// Create a new Task Api
app.post('/tasks/new', async (req, res) => {
    try {
        const newTask = new Task(req.body)
        newTask.save();
        console.log(newTask);
    } catch (err) {
        console.log(err);
    }
})

// Delete a Task Api
app.delete('/tasks/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await Task.findByIdAndDelete(id);
        console.log(deleteTask);
    } catch (err) {
        console.log(err);
    }
});

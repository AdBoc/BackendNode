const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create tasks schema and model
const TaskSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        index: true,
        unique: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['DONE', ' IN PROGRESS', 'NEW', 'REJECTED'],
        default: 'NEW'
    },
    date: {
        type: Date
    }
}, {
    timestamps: true
});

TaskSchema.methods.view = function (full){
    const obj = {
        id: this._id,
        title: this.title,
        deadline: this.deadline,
        status: this.status
    }

    if (full) {
        return { 
            ...obj,
            description: this.description
        }
    }
    return obj;
}

// const Task = mongoose.model('task', TaskSchema); //making model
// module.exports = Task; //exporting Task

module.exports = {
    TaskSchema,
    Task: mongoose.model('task', TaskSchema)
}
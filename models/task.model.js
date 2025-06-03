const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

var taskSchema = mongoose.Schema({
    "taskId": { type: Number, unique: true },
    "title": { type: String, default: "" },
    "description":  { type: String, default: "" },
    "due_date":  { type: Date },
    "status":  { type: String, default: "" },
    "Created_On" : { type: Date, default: Date.now }
});

// Plugin for auto-increment
taskSchema.plugin(AutoIncrement, { inc_field: 'taskId' });

const Task = mongoose.model('Task', userSchema);

module.exports = Task;

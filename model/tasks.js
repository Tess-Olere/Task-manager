// task title, priority, completed tag (schema)

const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: 'string',
        unique: true,
        required: true,
    },
    priority: {
        type: 'string',
        required: true,
    },
    completed: {
        type: 'boolean',
        default: false,
    }
},
 {timestamps: true}
)
module.exports = mongoose.model('Task', taskSchema)
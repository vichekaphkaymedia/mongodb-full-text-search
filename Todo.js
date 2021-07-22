const mongoose = require("mongoose");
const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
});

TodoSchema.index({
    title: 'text',
    description: 'text',
});

module.exports = mongoose.model("Todo", TodoSchema);
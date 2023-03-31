const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: String,
    sem: String,
    total: {
        type: Number,
        default: 0
    }
});

const Class = new mongoose.model("CLASS", classSchema);

module.exports = Class;
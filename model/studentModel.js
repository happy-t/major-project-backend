const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    classId: String,
    name: String,
    count: {
        type: String,
        default: 0
    },
    roll: String,
});

const Student = new mongoose.model("STUDENT", studentSchema);

module.exports = Student;
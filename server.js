const express = require('express');
const app = express();
const body_parser = require('body-parser');
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();
const port = process.env.PORT || 5050;
require("./database/conn");

app.use(cors());
app.use(body_parser.json());

const Class = require("./model/classModel");
const Student = require("./model/studentModel");



app.get("/", (req, res) => {
    res.send("hellow for backend");
})

app.get("/get_class", async (req, res) => {
    try {
        const data = await Class.find();
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (error) {
        console.log(error);
    }
})

app.post("/add_class", async (req, res) => {
    try {

        const { name, sem, students } = req.body;

        const classData = await Class.create({
            name: name,
            sem: sem
        })

        for (let i = 0; i < students.length; i++) {
            await Student.create({
                classId: classData._id,
                name: students[i].Name,
                roll: students[i].Roll,
                count: students[i].Count
            })
        }

        res.status(200).json({
            sucess: true,
            data: classData
        })

    } catch (error) {
        console.log(error);
    }
})

app.post("/get_class_count", async (req, res) => {
    try {
        const data = await Class.find({ _id: req.body._id });
        res.status(200).json({
            sucesss: true,
            data: data[0].total
        })

    } catch (error) {
        console.log(error);
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/get_students", async (req, res) => {
    try {
        const data = await Student.find({ classId: req.body.classId });
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (error) {
        console.log(error);
    }
})

app.post("/add_student", async (req, res) => {
    try {
        const data = await Student.create(req.body);
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (error) {
        console.log(error);
    }
})
/////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/attendance", async (req, res) => {
    try {
        const { classId, studentArray } = req.body;
        const { total } = await Class.findOne({ _id: classId });
        const classCount = await Class.findByIdAndUpdate({ _id: classId }, { total: total + 1 }, { new: true })

        for (let i = 0; i < studentArray.length; i++) {
            await Student.findByIdAndUpdate({ _id: studentArray[i]._id }, { count: Number(studentArray[i].count) + 1 });
        }

    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`listening at port ${port}`);
});
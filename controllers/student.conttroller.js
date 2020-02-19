import Student from '../models/Student';
import { validateRegisterInput } from '../validation/on-register'
import gravatar from 'gravatar';
const StudentController = {};

StudentController.getAll = async(req, res) => {
    try {
        await Student.find().sort({ date: -1 }).exec((err, students) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({
                students,
            });
        });
    } catch (err) {
        res.status(404).json({ nostudentsfound: "No students found" })
    }
};
StudentController.getStudent = async(req, res) => {
    try {
        Student.findById(
            req.params.id
        ).exec((err, student) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({
                student,
            });
        });
    } catch (err) {
        res.status(404).json({ nostudentsfound: "No student found" });
    }
};
StudentController.addStudent = async(req, res) => {
    try {
        const { errors, isValid } = validateRegisterInput(req.body);
        if (!isValid) {
            res.status(400).json(errors);
        }

        Student.findOne({ email: req.body.email }).then(student => {
            if (student) {
                errors.message = "Ya existe el correo";
                return res.status(422).send(errors);
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: "200",
                    r: "pg",
                    d: "mm"
                });
                const newStudent = new Student({
                    names: req.body.names,
                    surname: req.body.surname,
                    email: req.body.email,
                    identityDocumentNumber: req.body.identityDocumentNumber,
                    phoneNumber: req.body.phoneNumber,
                    birthday: req.body.birthday,
                    line: req.body.line || "",
                    district: req.body.district || "",
                    avatar
                });
                newStudent
                    .save()
                    .then(student => res.json(student))
                    .catch(err => console.log(err));
            }
        });

    } catch (err) {
        console.log(err);
    }
};

StudentController.updateStudent = async(req, res) => {
    try {
        const { errors, isValid } = validateRegisterInput(req.body);
        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        // Get fields
        const studentFields = {};
        if (req.body.names) studentFields.names = req.body.names;
        if (req.body.surname) studentFields.surname = req.body.surname;
        if (req.body.identityDocumentNumber)
            studentFields.identityDocumentNumber = req.body.identityDocumentNumber;
        if (req.body.email) studentFields.email = req.body.email;
        if (req.body.birthday) studentFields.birthday = req.body.birthday;
        if (req.body.city) studentFields.city = req.body.city;
        if (req.body.line) studentFields.line = req.body.line;
        if (req.body.district) studentFields.district = req.body.district;
        Student.findByIdAndUpdate(req.params.id, { $set: studentFields }, function(
            err,
            student
        ) {
            if (err) return next(err);
            res.send("Student udpated");
        });
    } catch (err) {
        console.log(err);
    }
};
StudentController.deleteStudent = async(req, res) => {
    try {
        Student.findById(
            req.params.id,
        ).exec((err, student) => {
            if (err) {
                res.status(500).send(err);
            }

            student.remove(() => {
                res.json({
                    success: true,
                    message: "Borrado con éxito"
                })
            });
        });
    } catch (err) {
        console.log(err);
    }
};

export default StudentController;
import { Router } from 'express';
const router = new Router();
import StudentController from '../controllers/student.conttroller';

// @route   GET api/students/test
// @desc    Tests students route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "students Works" }))

// Get all Students
// @access  Public
router.get('/', (req, res) => {
    StudentController.getAll(req, res);
});

// Get one Student by id
// @access  Public
router.get('/:id', (req, res) => {
    StudentController.getStudent(req, res);
});
// Add a new Student
// @access  Public
router.post('/', (req, res) => {
    StudentController.addStudent(req, res);
});
// Update a Student by id
// @access  Public
router.put('/:id', (req, res) => {
    StudentController.updateStudent(req, res);
});
// Delete a student by id
// @access  Public
router.delete('/:id', (req, res) => {
    StudentController.deleteStudent(req, res);
});
export default router;
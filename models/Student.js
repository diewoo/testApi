import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Create Schema
const StudentSchema = new Schema({
    names: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    identityDocumentNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    birthday: {
        type: Date
    },
    avatar: {
        type: String
    },
    line: {
        type: String
    },
    district: {
        type: String
    }
});
const Student = mongoose.model('Student', StudentSchema);

export default Student;
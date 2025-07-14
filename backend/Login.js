const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    companyName : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    year : {
        type : Number,
        required : true
    },
    lpa : {
        type : Number,
        required : true
    },
    interviewExperience : {
        type : String,
        required : true
    },
    tips : {
        type : [String]
    },
    url : {
        type : String,
        required : true
    },
    qaList : [{
        question : String,
        answers : [String]
    }]
},{timestamps : true});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  interview: [InterviewSchema]
}, {
  timestamps: true
});

const UserModel = mongoose.model('User', UserSchema);
const intExp = mongoose.model('intExp',InterviewSchema);
module.exports = {UserModel,intExp};

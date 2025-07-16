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
    }],
    likes: {
      count: { type: Number, default: 0 },
      users: [String] 
    },
    saves: [String],
},{timestamps : true});

const UserSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String },
  role: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  about: { type: String },
  linkedin: { type: String },
  password: { type: String, required: true },
  interview: [InterviewSchema]
}, {
  timestamps: true
});

const UserModel = mongoose.model('User', UserSchema);
const intExp = mongoose.model('intExp',InterviewSchema);
module.exports = {UserModel,intExp};

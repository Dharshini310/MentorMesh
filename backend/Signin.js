const mongoose = require('mongoose')
const SigninSchema = new mongoose.Schema(
    {
        email:{type:String,require:true,unique:true},
        password:{type:String,require:true,unique:true},
        confirm_password:{type:String,require:true}
    }
)

const SigninModel = mongoose.model('Signin',SigninSchema)

module.exports = SigninModel
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:{type:String, required: true},
  email:{type:String,required:true,unique:true},
  otp:{type:String,required:false,default:"none"},
  password:{type:String,required:true},
  verfication:{type:Boolean,default:false},
  phone:{type:String,default:"0123456789"},
  phoneVerfication:{type:Boolean,default:false},
  address:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Address",
    required:false,
  },
  userType:{type:String,required:true,defalult:"Client",enum:['Client','Admin','Vendor','Driver']},
  profile:{type:String,default:'https://d326fntlu7tb1e.cloudfront.net/uploads/bdec9d7d-0544-4fc4-823d-3b898f6dbbbf-vinci_03.jpeg'}
},{timestamps:true});

module.exports = mongoose.model('User',UserSchema);
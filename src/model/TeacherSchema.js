const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  tecId: {
    type: String,
    required: true,
  },
  tecFullName: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    require:true
  },
  tecSubject: {
    type: String,
    required: true,
  },
  tecAddress: {
    type: String,
    required: true,
  },
  tecTp: {
    type: String,
    required: true,
  },
  tecWhatsappNo: {
    type: String,
    required: true,
  },
  tecRole: {
    type: String,
    required: true,
    default:'teacher'
  },
});

module.exports = mongoose.model("Teacher", TeacherSchema);

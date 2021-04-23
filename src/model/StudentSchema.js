const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  stdId: {
    type: String,
    required: true,
  },
  stdFullName: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    require:true
  },
  stdGrade: {
    type: String,
    required: true,
  },
  stdDOB: {
    type: Date,
    required: true,
  },
  stdAddress: {
    type: String,
    required: true,
  },
  stdTp: {
    type: String,
    required: true,
  },
  stdSchool: {
    type: String,
    required: true,
  },
  stdGardian: {
    type: String,
    required: true,
  },
  stdWhatsappNo: {
    type: String,
    required: true,
  },
  stdSubjects: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Student", StudentSchema);

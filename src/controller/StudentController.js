const StudentSchema = require("../model/StudentSchema");
const bcrypt = require("bcrypt");

const registration = (req, resp) => {
  StudentSchema.findOne({ stdId: req.body.stdId }, (err, result) => {
    if (result) {
      resp.status(200).json({
        message: "Student No %s already exist.".replace("%s", result.stdId),
      });
      console.log(err);
    } else {
      bcrypt.hash(req.body.passwd, 10, (err, pass) => {
        const stdSave = new StudentSchema({
          stdId: req.body.stdId,
          stdFullName: req.body.stdFullName,
          password: pass,
          stdGrade: req.body.stdGrade,
          stdDOB: req.body.stdDOB,
          stdAddress: req.body.stdAddress,
          stdTp: req.body.stdTp,
          stdSchool: req.body.stdSchool,
          stdGardian: req.body.stdGardian,
          stdWhatsappNo: req.body.stdWhatsappNo,
          stdSubjects: req.body.stdSubjects,
        });
        stdSave
          .save()
          .then(() => {
            resp.status(200).json({ message: "Student Added Success!" });
          })
          .catch((err) => {
            resp.status(200).json({ message: "Something went wrong.!" });
          });
      });
    }
  });
};

const updateStudent = async (req, resp) => {
  await StudentSchema.findOneAndUpdate(
    { stdId: req.body.stdId },
    {
      $set: {
        stdFullName: req.body.stdFullName,
        stdGrade: req.body.stdGrade,
        stdDOB: req.body.stdDOB,
        stdAddress: req.body.stdAddress,
        stdTp: req.body.stdTp,
        stdSchool: req.body.stdSchool,
        stdGardian: req.body.stdGardian,
        stdWhatsappNo: req.body.stdWhatsappNo,
        stdSubjects: req.body.stdSubjects,
      },
    },
    { new: true },
    (err, result) => {
      if (result) {
        resp.status(200).json({ message: "Success!", data: result });
      } else {
        resp.status(200).json({ message: "Error!", data: err });
      }
    }
  );
};

const getAllStudents = (req, resp) => {
  StudentSchema.find({}, (err, result) => {
    if (err) {
      resp
        .status(200)
        .json({ message: "Error: Something went wrong!", data: err });
    } else {
      resp.status(200).json({ message: "Success!", data: result });
    }
  });
};

const getUserData = (req, resp) => {
  StudentSchema.findOne({ stdId: req.userData.stdId }, (err, result) => {
    if (err) {
      resp
        .status(200)
        .json({ message: "Error: Something went wrong!", data: err });
    } else {
      resp.status(200).json({
        message: "Data Found.!",
        data: {
          stdId: result.stdId,
          stdFullName: result.stdFullName,
          stdGrade: result.stdGrade,
          stdSubjects: result.stdSubjects,
        },
      });
    }
  });
};

module.exports = { registration, getAllStudents, updateStudent, getUserData };

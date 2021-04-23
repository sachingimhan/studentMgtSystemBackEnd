const TeacherSchema = require("../model/TeacherSchema");
const bcrypt = require("bcrypt");

const addNewTeacher = (req, resp) => {
  try {
    TeacherSchema.findOne({ tecId: req.body.tecId }, (err, result) => {
      if (result) {
        resp.status(200).json({
          message: "Teacher ID %s already exist.".replace("%s", result.tecId),
        });
      } else {
          if(req.body.hasOwnProperty('passwd')){
            bcrypt.hash(req.body.passwd, 10, (err, pass) => {
                const tecSave = new TeacherSchema({
                  tecId: req.body.tecId,
                  tecFullName: req.body.tecFullName,
                  password: pass,
                  tecSubject: req.body.tecSubject,
                  tecAddress: req.body.tecAddress,
                  tecTp: req.body.tecTp,
                  tecWhatsappNo: req.body.tecWhatsappNo,
                  tecRole: req.body.tecRole,
                });
                tecSave
                  .save()
                  .then(() => {
                    resp.status(200).json({ message: "Teacher Added Success!" });
                  })
                  .catch((err) => {
                    resp.status(200).json({ message: "Something went wrong.!" });
                  });
              });
          }else{
            resp.status(500).json({ message: "Something went wrong.!", data: null });
          }
      }
    });
  } catch (error) {
    resp.status(500).json({ message: "Something went wrong.!", data: error });
  }
};

module.exports = { addNewTeacher };

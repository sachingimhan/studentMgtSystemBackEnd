const StudentSchema = require("../model/StudentSchema");
const TeacherSchema = require("../model/TeacherSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { throws } = require("assert");

const stdLogin = (req, resp) => {
  try {
    StudentSchema.findOne(
      {
        $and: [{ stdId: req.body.stdId }, { stdGrade: req.body.stdGrade }],
      },
      (err, result) => {
        if (result !== null && result.password != null) {
          bcrypt.compare(
            req.body.passwd,
            result.password,
            async (err, pass) => {
              if (pass) {
                const token = await jwt.sign(
                  {
                    stdId: result.stdId,
                    stdFullName: result.stdFullName,
                    stdGrade: result.stdGrade,
                  },
                  "xxxx",
                  {
                    expiresIn: "1h",
                  }
                );
                resp.status(200).json({
                  isSuccess: true,
                  message: "Login Success!",
                  data: token,
                });
              } else {
                resp.status(200).json({
                  isSuccess: false,
                  message: "Invalide Login.!",
                  data: null,
                });
              }
            }
          );
        } else {
          resp.status(200).json({
            isSuccess: false,
            message: "Student Not Found!",
            data: result,
          });
        }
      }
    );
  } catch (error) {
    resp
      .status(500)
      .json({ isSuccess: false, message: "Try Again.!", data: error });
  }
};

const tecLogin = (req, resp) => {
  try {
    TeacherSchema.findOne({ tecId: req.body.tecId }, (err, result) => {
      if (result !== null && result.password != null) {
        bcrypt.compare(req.body.passwd, result.password, async (err, pass) => {
          if (pass) {
            const token = await jwt.sign(
              {
                tecId: result.tecId,
                tecFullName: result.tecFullName,
              },
              "xxxx",
              {
                expiresIn: "1h",
              }
            );
            resp.status(200).json({
              isSuccess: true,
              message: "Login Success!",
              data: token,
            });
          } else {
            resp.status(200).json({
              isSuccess: false,
              message: "Invalide Login.!",
              data: null,
            });
          }
        });
      } else {
        resp.status(200).json({
          isSuccess: false,
          message: "Teacher Not Found!",
          data: null,
        });
      }
    });
  } catch (error) {
    resp
      .status(500)
      .json({ isSuccess: false, message: "Try Again.!", data: error });
  }
};

module.exports = { stdLogin, tecLogin };

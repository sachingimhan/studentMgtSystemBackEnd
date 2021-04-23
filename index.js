const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { route } = require("./src/router/StudentRouter");
const StudentRouter = require("./src/router/StudentRouter");
const LoginRouter = require("./src/router/LoginRouter");
const TeacherRouter = require("./src/router/TeacherRouter");
const cros = require("cors");

const app = express();
const port = process.env.PORT || "8085";
app.use(express.json());
app.use(cros());

//"mongodb+srv://insource:rockey@123@educoenglishcluster.xnsdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect("mongodb://localhost:27017/educodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open',()=>{
  app.listen(port, () => {
    console.log("Node Server is Up and Running on PORT " + port);
  });
}).on('error',(err)=>{
  console.log('Error : ',err);
});

app.use("/api/v1/", StudentRouter);
app.use("/api/v1/", LoginRouter);
app.use("/api/v1/", TeacherRouter);



const express = require("express");
const { dbconnect } = require("./DBConnect");
const cors = require('cors')

const LoginModel = require("./Login");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json())
app.use("/mentormesh", require('./Routes'));
// app.post("/login", (req, res) => {
//   LoginModel.create(req.body)
//     .then((Login) => res.json(Login))
//     .catch((err) => res.json(err));
// });
dbconnect().then(() => {
  app.listen(3000, () => {
    console.log("Server is running!");
  });
});

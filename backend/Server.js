const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const server = express();
const cors = require("cors");
server.use(bodyParser.json());
server.use(express.json());
server.use(cors());

//Establish the database connection

const db = mysql.createConnection({
  host: "localhost",
  user: "dbsmschool",
  password: "tusa@1234",
  database: "dbsmschool",
});

db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB:", error);
  } else {
    console.log("Successfully Connected to DB");
  }
});

//Establish the Port

server.listen(9002, function check(error) {
  if (error) {
    console.log("Error....dddd!!!!");
  } else {
    console.log("Started....!!!! 9002");
  }
});

//Create the Records

server.post("/api/student/add", (req, res) => {
  let details = {
    stname: req.body.stname,
    course: req.body.course,
    fee: req.body.fee,
    // studentid
  };
  let sql = "INSERT INTO student SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Student created Failed" });
    } else {
      res.send({ status: true, message: "Student created successfully" });
    }
  });
});

//view the Records

server.get("/api/student", (req, res) => {
  var sql = "SELECT * FROM student";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
      console.log("Error Connecting to DB 2:", error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Search the Records

server.get("/api/student/:id", (req, res) => {
  var studentid = req.params.id;
  var sql = "SELECT * FROM student WHERE id=" + studentid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB 3:", error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// server.put("/api/student/update/:id", (req, res) => {
//   let details = {
//     stname: req.body.stname,
//     course: req.body.course,
//     fee: req.body.fee,
//   };

//   let sql = "UPDATE student SET ? WHERE studentid = ?";
//   db.query(sql, [details, req.params.id], (error) => {
//     if (error) {
//       console.error(error);
//       res.send({ status: false, message: "Student update failed" });
//     } else {
//       res.send({ status: true, message: "Student updated successfully" });
//     }
//   });
// });

//Update the Records

server.put("/api/student/update/:id", (req, res) => {
  console.log("Request Body:", req.params.id); // Log the request body

  let sql =
    "UPDATE student SET stname='" +
    req.body.stname +
    "', course='" +
    req.body.course +
    "',fee='" +
    req.body.fee +
    "' WHERE studentid=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Student Update Failed" });
      console.log(error);
    } else {
      res.send({ status: true, message: "Student Updated successfully" });
    }
  });
});

//Delete the Records

server.delete("/api/student/delete/:id", (req, res) => {
  let sql = "DELETE FROM student WHERE studentid=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Student Deleted Failed" });
      console.log(error);
    } else {
      res.send({ status: true, message: "Student Deleted successfully" });
    }
  });
});

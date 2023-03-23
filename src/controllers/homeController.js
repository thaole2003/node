import pool from "../configs/connectDB";
import multer from "multer";
// let getController = (req, res) => {
//   let data = [];

//   connection.query("SELECT * FROM `user`", function (err, results, fields) {
//     results.map((row) => {
//       data.push({
//         id: row.id,
//         firstname: row.firstname,
//         lastname: row.lastname,
//         mail: row.mail,
//       });
//     });
//     res.render("product/index.ejs", { datauser: data });
//   });
// };
let getController = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM user");

  return res.render("product/index.ejs", {
    datauser: rows,
  });
};
let uploadd = async (req, res) => {
  return res.render("product/upload.ejs");
};

// const handleupload = async (req,res)=>{
const upload = multer().single("profile_pic");

let handleUploadFile = async (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
    );
  });
};
// }
const adduser = (req, res) => {
  return res.render("product/add.ejs");
};
const edituser = async (req, res) => {
  let id = req.params.id;
  const [oneu] = await pool.execute(`select * from user where id = ?`, [id]);
  return res.render("product/edit.ejs", { oneu: oneu[0] });
};
const handleedituser = async (req, res) => {
  let id = req.params.id;
  console.log(req.body);
  // console.log(id);
  await pool.execute(
    "update user set firstname = ?,lastname = ?,mail = ? where id= ?",
    [req.body.firstname, req.body.lastname, req.body.mail, id]
  );
  return res.redirect("/");
};
const handleadduser = async (req, res) => {
  // console.log(req.body);
  await pool.execute(`insert into user values(?,?,?,?)`, [
    null,
    req.body.firstname,
    req.body.firstname,
    req.body.mail,
  ]);
  return res.redirect("/");
};
const deleteuser = async (req, res) => {
  let id = req.params.id;
  console.log(id);

  await pool.execute(`delete from user where id  = ?`, [id]);
  return res.redirect("/");
};
let getdetail = async (req, res) => {
  // return res.send("abc");
  let id = req.params.id;
  const [oneu] = await pool.execute(`select * from user where id = ?`, [id]);
  return res.render("product/detail.ejs", { oneu: oneu[0] });
};

module.exports = {
  getController,
  getdetail,
  adduser,
  handleadduser,
  deleteuser,
  edituser,
  handleedituser,
  uploadd,
};

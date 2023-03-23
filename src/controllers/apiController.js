import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
  //http
  // 404 501
  // json/xml => object
  const [rows, fields] = await pool.execute("SELECT * FROM user");

  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};
let createNewUser = async (req, res) => {
  let { firstName, lastName, mail } = req.body;

  if (!firstName || !lastName || !mail) {
    return res.status(200).json({
      message: "missing required params",
    });
  }

  await pool.execute(`insert into user values(?,?,?,?)`, [
    null,
    req.body.firstname,
    req.body.firstname,
    req.body.mail,
  ]);
  return res.status(200).json({
    message: "ok",
  });
};

let updateUser = async (req, res) => {
  let { firstName, lastName, mail, id } = req.body;
  if (!firstName || !lastName || !mail || !id) {
    return res.status(200).json({
      message: "missing required params",
    });
  }

  await pool.execute(
    "update user set firstname = ?,lastname = ?,mail = ? where id= ?",
    [req.body.firstname, req.body.lastname, req.body.mail, id]
  );

  return res.status(200).json({
    message: "ok",
  });
};

let deleteUser = async (req, res) => {
  let userId = req.params.id;
  if (!userId) {
    return res.status(200).json({
      message: "missing required params",
    });
  }
  await pool.execute(`delete from user where id  = ?`, [userId]);

  return res.status(200).json({
    message: "ok",
  });
};
module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};

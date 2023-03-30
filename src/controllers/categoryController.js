import pool from "../configs/connectDB";

let getController = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM category");
  
    return res.render("category/index.ejs", {
      datacate: rows,
    });
  };
  const addController = async (req,res)=>{
    return res.render("category/add.ejs");
  }
  const addPost =  async (req,res)=>{
    await pool.execute(`insert into category values(?,?)`, [
        null,
        req.body.name,
      
      ]);
      return res.redirect("/category");
  } 
  const deletecate = async (req,res)=>{
    let id = req.params.id;
    console.log(id);
    await pool.execute(`delete from category where id = ?`,[
id
    ])
    return res.redirect("/category");
  }
  const editcate = async (req,res) =>{
    let id = req.params.id;
    const [onec]=  await pool.execute(`select * from category where id = ?`,[id])
    // console.log(onec);
    return res.render('category/edit.ejs',{onecate : onec[0]})
  }
  const editpost = async (req,res)=>{
    let id = req.params.id;
console.log(req.body);
    await pool.execute(`UPDATE category SET name = ? where id =?`,[req.body.name,id])
    return res.redirect('/category')

  }
  module.exports = {
    getController,
    addController,
    addPost,
    deletecate,
    editcate,
    editpost
  }
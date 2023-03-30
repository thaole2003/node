import express from "express";
import homeController from "../controllers/homeController";
import categoryController from "../controllers/categoryController";
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");
let router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initrouteWeb = (app) => {
  router.get("/detail/user/:id", homeController.getdetail);
  router.get("/delete/user/:id", homeController.deleteuser);
  router.get("/", homeController.getController);
  router.get("/edit/user/:id", homeController.edituser);
  router.post("/handleedituser/user/:id", homeController.handleedituser);
  router.get("/adduser", homeController.adduser);
  router.post("/handleadduser", homeController.handleadduser);
  router.get("/upload", homeController.getUploadFilePage);
  router.get("/category", categoryController.getController);
  router.get("/addcategory", categoryController.addController);
  router.get("/delete/category/:id", categoryController.deletecate);
  router.get("/edit/category/:id", categoryController.editcate);
  router.post("/addpost", categoryController.addPost);
  router.post("/editpost/category/:id", categoryController.editpost);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUploadFile
  );
  return app.use("/", router);
};
// export default initroute;
// module.exports = initroute;
export default initrouteWeb;

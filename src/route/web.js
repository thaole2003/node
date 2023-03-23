import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router();
const initrouteWeb = (app) => {
  router.get("/detail/user/:id", homeController.getdetail);
  router.get("/delete/user/:id", homeController.deleteuser);
  router.get("/", homeController.getController);
  router.get("/upload", homeController.uploadd);
  router.get("/edit/user/:id", homeController.edituser);
  router.post("/handleedituser/user/:id", homeController.handleedituser);
  router.get("/adduser", homeController.adduser);
  router.post("/handleadduser", homeController.handleadduser);

  return app.use("/", router);
};
// export default initroute;
// module.exports = initroute;
export default initrouteWeb;

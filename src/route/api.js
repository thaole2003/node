import express from "express";
import apiController from "../controllers/apiController";
let router = express.Router();
const initrouteAPI = (app) => {
  router.get("/users", apiController.getAllUsers); // method GET -> READ data
  router.post("/create-user", apiController.createNewUser); // method POST -> CREATE data
  router.put("/update-user", apiController.updateUser); //method PUT -> UPDATE data
  router.delete("/delete-user/:id", apiController.deleteUser);
  return app.use("/api/v1/", router);
};
// export default initroute;
// module.exports = initroute;
export default initrouteAPI;

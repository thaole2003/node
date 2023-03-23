const express = require("express");
import initrouteWeb from "./route/web";
import initrouteAPI from "./route/api";
require("dotenv").config();
import configviewEngine from "./configs/viewEngine";

const app = express();
configviewEngine(app);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT;
initrouteWeb(app);
initrouteAPI(app);
// app.get("/", function (req, res) {
//   res.render("./product/index.ejs");
// });

app.listen(port, () => console.log(`running on http://localhost:` + port));

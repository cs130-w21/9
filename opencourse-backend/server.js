const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const courseRoutes = express.Router();

app.use("/courses", courseRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

courseRoutes.route("/").get(function (req, res) {
  console.log("testing");
});

courseRoutes.route("/:id").get(function (req, res) {
  console.log("testing");
});
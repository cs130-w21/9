const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { json } = require("body-parser");
const PORT = 4000;
const courseRoutes = express.Router();

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

app.use("/courses", courseRoutes);

courseRoutes.route("/").get((req, res) => {
  console.log("Displaying all courses!");
});

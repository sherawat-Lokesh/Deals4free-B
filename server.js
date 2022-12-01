const express = require("express");
const cors = require("cors");
const knex = require("knex");
// const moongose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(cors());
app.use(bodyParser.json());



//connecting to psql(postgresql) for fetching home page card components
const db = knex({
      client: "pg",
  connection: {
        host: "dpg-ce49h1hgp3jocdduv0fg-a",
        port: 5432,
        user: "sherawat",
    password: "iGgQSfNcttYb2WuLzID3feLzWbKfBY0R",
    database: "deals4_database",
              },
});

//home page response
app.get("/", (req, res) => {
  db.select("*")
    .from("cardcomponent")
      .then((data) => {
        return res.json(data);
    });
});

//article page
let file = "";
app.post("/article", (req, res) => {
  try {
    const { fileName } = req.body;
      if (fileName === null) {
        return res.status(404).json("file not found");
      }
          res.sendFile(path.join(__dirname, `./htmlFiles/${fileName}`));
  }catch (err) {
          res.json("Something went wrong!");
  }
});

app.listen(process.env.PORT || 8000, () => console.log("server working"));

const express = require("express");
const cors = require("cors");
const knex = require("knex");

const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(cors());
app.use(bodyParser.json());



//connecting to psql(postgresql) for fetching home page card components
const db = knex({
      client: "pg",
  connection: {
        host: process.env.DATABASE_URL,
        user:'sherawat',
        port:5432,
        password:'nuUfQLici2QAhxULZTuiK2Dpc7T6lrAB',
        database:'deals4_database_31qe',
              },
});

//home page response
app.get("/", (req, res) => {
  db.select("*")
    .from("deals4_database_31qe")
      .then((data) => {
        return res.json(data);
    });
});

//article page
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

const express = require("express");
const cors = require("cors");
const knex = require("knex");

const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use(bodyParser.json());



//connecting to psql(postgresql) for fetching home page card components
const db = knex({
      client: "pg",
  connection: {
        host: process.env.DATABASE_URL,
        port:5432,
        user:'sherawat',
        database:'deals4_database_31qe',
        ssl:true,
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

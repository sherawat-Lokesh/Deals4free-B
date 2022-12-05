const express = require("express");
const cors = require("cors");
const knex = require("knex");

const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port=process.env.PORT || 8000



  app.use(cors());
  app.use(bodyParser.json());


//connecting to psql(postgresql) for fetching home page card components
const db = knex({
      client: "pg",
  connection: {
        host: '127.0.0.1',
        user:'postgres',
        port:5432,
        password:'12345@Temp',
        database:'deals4_database',
              },
});
app.get("/",(req,res)=>{return res.json('hii')})

//home page response
app.get("/", (req, res) => {
  db.select("*")
    .from("cardcomponent")
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

app.listen(port, () => console.log("server working",port));

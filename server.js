import * as dotenv from 'dotenv'
import bodyParser from "body-parser";
import express  from "express";
import cors from 'cors';
import knex from 'knex';
import path from "path";


dotenv.config()

const app = express();


  app.use(cors());
  app.use(bodyParser.json());

console.log(process.env.HOST,process.env.USER,process.env.PASSWORD,process.env.DATABASE)
//connecting to psql(postgresql) for fetching home page card components
const db = knex({
      client: "pg",
  connection: {
        host:process.env.HOST,
        user:process.env.DATABASE,
        password:process.env.PASSWORD,
        database:process.env.DATABASE,

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
app.post("/article", (req, res) => {
  try {
    const { fileName } = req.body;
    console.log(fileName)
      if (fileName === null) {
        return res.status(404).json("file not found");
      }
          res.sendFile(path.join(__dirname, `./htmlFiles/${fileName}`));
  }catch (err) {
          res.json("Something went wrong!");
  }
});

app.listen(process.env.PORT || 8000, () => console.log("server working",8000));

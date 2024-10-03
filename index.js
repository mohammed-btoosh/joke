// importing packages
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
// the url to get a random joke
const apiUrl = "https://v2.jokeapi.dev/joke/Programming";

const app = express();

app.use(express.static("public")); // for static files like style.css
app.use(bodyParser.urlencoded({ extended: true })); // to hit the body of a post req

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/joke", async (req, res) => {
  // getting random joke after a user write his name
  try {
    const name = req.body.name;
    const result = await axios.get(apiUrl);
    const content = result.data;
    //test
    res.render("index.ejs", { content, name });
  } catch (error) {
    console.log("Error: ", error.message);

    res.status(500).send({
      message: "An error occurred while fetching the joke.",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`the server running on port ${port} `);
});

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRoute } = require("./Routes/user.routes");
const { postRoute } = require("./Routes/post.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/post", postRoute);

app.get("/", (req, res) => {
  res.json({ msg: "Home Routes" });
});

app.listen(process.env.PORT, async () => {

  try {

    await connection;
    console.log("Connected to DB");
    console.log(`Server is running at port ${process.env.PORT}`);
  } 
  
  catch (err) {
    console.error(err);
  }
});
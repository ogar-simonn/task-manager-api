const express = require("express");
const app = express();
const boards = require("./routes/boardsRoute");
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");
const errorHandlerMiddleWare = require("./middleware/errorHandler");
const authRouter = require("./routes/auth");
const authentication = require("./middleware/authentication");

require("dotenv").config();

app.use([
  express.static("./methods-public"),
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
]);

app.use("/api/v1/boards", authentication, boards);
app.use("/auth", authRouter);

app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening at port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

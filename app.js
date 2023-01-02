const express = require("express");
const app = express();
const tasks = require("./routes/taskRoutes");
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notFoundErr");

require("dotenv").config();

app.use([
  express.static("./methods-public"),
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
]);

app.use("/api/v1/tasks", tasks);

app.use(notFoundErr);

const port = 3000;

// app.get("/api/v1/tasks")        - get all the tasks
// app.post("/api/v1/tasks")       - create a new task
// app.get("/api/v1/tasks/:id")    - get a single task
// app.patch("/api/v1/tasks/:id")  - update task
// app.delete("/api/v1/tasks/:id") - delete task

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening at port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

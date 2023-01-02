const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");


const getTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {

    const task = await Task.create(req.body);
    res.status(201).json(task);
 
});


const getSingleTask = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  if (id) {
    
      const singleTask = await Task.findOne({ _id: id });
      if (singleTask) {
        return res.status(200).json({ singleTask });
      }
      res.json({ msg: "cannot find that task with id" + " " + id });
    
  }
  return res.status(200).json({ msg: "please provide an id" });
});

const updateTask = asyncWrapper(async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (task) {
      return res.status(200).json({ task });
    }

    res.status(400).json({ msg: "Task not found" });
  } catch (error) {
    console.log(error);
  }
});

const deleteTask = asyncWrapper(async (req, res) => {

    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id });
    if (task) {
      return res.status(200).json({ task });
    } else {
      res.status(400).json({ msg: `No task with id: ${id}` });
    }
});

module.exports = {
  getTasks,
  getSingleTask,
  deleteTask,
  updateTask,
  createTask,
};

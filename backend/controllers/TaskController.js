import taskModel from "../models/TaskModel.js";

const createTask = async (req, resp) => {
  try {
    const { name, duration } = req.body;
    if (!name || !duration) {
      return resp.status(400).json({ message: "You cant leave empty fields" });
    }
    const createTask = new taskModel({
      name,
      duration,
      state: 0,
    });

    await createTask.save();
    resp.status(201).json({ message: "New task noted" });
  } catch (error) {
    console.error(error.message);
    resp.status(400).json({ message: `Create error + ${error.message}` });
  }
};

const getTasks = async (req, resp) => {
  try {
    const task = await taskModel.find({});
    if (task.length === 0)
      return resp
        .status(400)
        .json({ message: "Seems like there is no data to show" });

    resp.status(200).json({ message: "Data: ", task });
  } catch (error) {
    console.error(error.message);
    return resp.status(500);
  }
};
const getTask = async (req, resp) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findById(id);
    if (!task) return resp.status(404).json("Nothing found to the related ID");
    return resp.status(200).json({ message: "Task data", task });
  } catch (error) {
    resp.status(5000).json({ message: "Internal server error" });
  }
};

const updateTask = async (req, resp) => {
  try {
    const { name, duration } = req.body;
    const taskID = req.params.id;

    const taskToUpdate = await taskModel.findById(taskID);
    if (!taskToUpdate)
      return resp
        .status(404)
        .json({ message: "Wasnt found any task with this ID" });

    if (name) taskToUpdate.name = name;
    if (duration) taskToUpdate.duration = duration;
    await taskToUpdate.save();
    resp.status(200).json({ message: "Task updated with success" });
  } catch (error) {
    console.log(error.message);
    resp.status(500).json({ message: "Internal server error" });
  }
};

const updateTaskState = async (req, resp) => {
  try {
    const taskID = req.params.id;
    const taskToUpdate = await taskModel.findById(taskID);
    if (!taskToUpdate)
      return resp
        .status(404)
        .json({ message: "Wasnt found any task with this ID" });
    if (taskToUpdate.state === 0) {
      taskToUpdate.state = 1;
    } else {
      taskToUpdate.state = 0;
    }

    await taskToUpdate.save();
    resp.status(200).json({ message: "Task status was changed" });
  } catch (error) {
    console.log(error.message);
    resp.status(500).json({ message: "Internal server error" });
  }
};

const deleteTask = async (req, resp) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findById(id);
    if (!task) return resp.status(404).json({ message: "Task not found" });
    const delTask = await taskModel.findByIdAndDelete(id);
    if (delTask) resp.status(200).json({ message: "Removed with success" });
  } catch (error) {
    resp.status(500).json({ message: "Internal server error" });
  }
};
export {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateTaskState,
};

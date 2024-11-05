import express from "express";

import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  updateTaskState,
  deleteTask,
} from "../controllers/TaskController.js";
const taskRoutes = express.Router();

taskRoutes.route("/create").post(createTask);
taskRoutes.route("/").get(getTasks);
taskRoutes.route("/:id").get(getTask).delete(deleteTask).patch(updateTaskState);
taskRoutes.route("/edit/:id").patch(updateTask);

export default taskRoutes;

import mongoose from "mongoose";
const { Schema } = mongoose;
const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    state: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("task", taskSchema);
export default taskModel;

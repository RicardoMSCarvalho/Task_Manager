import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { patch, get } from "../../services/Endpoint";

function Taskedit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await get(`task/${id}`);
        const { task } = response.data;
        setName(task.name);
        setDuration(task.duration);
      } catch (error) {
        console.log("Error fetching task:", error.message);
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      duration,
    };

    try {
      const response = await patch(`task/edit/${id}`, formData);
      if (response.status === 200) {
        console.log("Task updated successfully");
      }
      navigate("/task");
    } catch (error) {
      console.log("Error updating task:", error.message);
    }
  };

  return (
    <div
      className="login template d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#333333 " }}
    >
      {" "}
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handleUpdateProfile}>
          <h3 className="text-center">Edit Task</h3>
          <div className="mb-2">
            <label htmlFor="task">Task:</label>
            <input
              type="text"
              placeholder="Task to do"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="Duration">Duration:</label>
            <input
              type="number"
              placeholder="Task duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" type="submit">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Taskedit;

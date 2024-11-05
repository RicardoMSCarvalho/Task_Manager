import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { get, del, patch } from "../../services/Endpoint";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const DataTable = ({ state }) => {
  DataTable.propTypes = {
    state: PropTypes.number.isRequired,
  };

  const [task, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await get("/task");
        const data = response.data;
        setTasks(data.task);
        const filtered = task.filter((tsk) => tsk.state === state);
        setFilteredTasks(filtered);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTasks();
  }, [task, state]);

  const handleState = async (ID) => {
    try {
      const response = await patch(`/task/${ID}`);
      if (response) alert("Task status updated");
    } catch (error) {
      console.error("Error when updating state: " + error.message);
    }
  };
  const handleDelete = async (ID) => {
    try {
      const response = await del(`/task/${ID}`);
      if (response) alert("Task removed");
    } catch (error) {
      console.error("Error when deleting" + error.message);
    }
  };
  return (
    <>
      {state === 0 ? (
        filteredTasks.length > 0 ? (
          <h1>Pending tasks 😪</h1>
        ) : (
          <h1>Congrats you have all you tasks completed 😊</h1>
        )
      ) : filteredTasks.length > 0 ? (
        <h1>Tasks already done ✅</h1>
      ) : (
        <h1>You dont have any task completed yet</h1>
      )}
      <Table
        className="mt-4 table-custom"
        striped
        bordered
        hover
        variant="dark"
        size="sm"
      >
        <thead>
          <tr>
            <th width="35">#</th>
            <th width="400">Task</th>
            <th width="50">Duration(min)h</th>
            <th width="150">State</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={task._id || index}>
              <td>{index + 1}</td>
              <td>{task.name}</td>
              <td>{task.duration}</td>
              <td>{task.state === 0 ? "Pending" : "Completed"}</td>
              <td>
                <Link to={`/task/edit/${task._id}`}>✏</Link>{" "}
                <Link onClick={() => handleState(task._id)}>✅</Link>{" "}
                <Link onClick={() => handleDelete(task._id)}>❌</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default DataTable;

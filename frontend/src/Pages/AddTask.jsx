import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(5, { message: "Min length is 5 characters" }),
  duration: z
    .number()
    .int()
    .positive()
    .min(1, { message: "Must be at least 1digit" }),
});

function AddTask() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/task/create",
        data
      );

      alert("New task added", response);
      reset();
    } catch (error) {
      setError("root", { message: "Error adding new task" }, error);
    }
  };

  return (
    <>
      <div
        className="login template d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "#333333 " }}
      >
        <div className="form_container p-5 rounded bg-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center">Add new task</h3>
            <div className="mb-2">
              <label htmlFor="task">Task:</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Ex:Turn of the lights"
                className="form-control"
              />
              {
                <div className="error-message">
                  {errors.name && errors.name.message}
                </div>
              }
            </div>
            <div className="mb-2">
              <label htmlFor="Duration">Duration:</label>
              <input
                type="number"
                {...register("duration", { valueAsNumber: true })}
                placeholder="Ex:45min"
                className="form-control"
              />
              {
                <div className="error-message">
                  {errors.duration && errors.duration.message}
                </div>
              }
            </div>

            <div className="d-grid">
              <button
                disabled={isSubmitting}
                className="btn btn-primary"
                type="submit"
              >
                {isSubmitting ? "Adding..." : "Add Task"}
              </button>
              {
                <div className="error-message">
                  {errors.root && errors.root.message}
                </div>
              }
            </div>
          </form>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default AddTask;

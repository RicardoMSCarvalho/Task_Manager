import DataTable from "../Components/DataTable";

const Tasks = () => {
  return (
    <div className="show-data">
      <DataTable state={0} />

      <DataTable state={1} />
    </div>
  );
};

export default Tasks;

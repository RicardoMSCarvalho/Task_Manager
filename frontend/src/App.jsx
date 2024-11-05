import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NavigationBar from "./Components/NavigationBar";
import AddTask from "./Pages/AddTask";
import NothingFound from "./Pages/NothingFound";
import Tasks from "./Pages/Tasks";
import Taskedit from "./Pages/Taskedit";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavigationBar />,
      children: [
        { index: true, element: <AddTask /> },
        {
          path: "task/create",
          element: <AddTask />,
        },
        {
          path: "task/edit/:id",
          element: <Taskedit />,
        },
        {
          path: "task",
          element: <Tasks />,
        },
        { path: "*", element: <NothingFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

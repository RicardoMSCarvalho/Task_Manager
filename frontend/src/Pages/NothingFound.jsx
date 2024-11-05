import { Link, Outlet } from "react-router-dom";

const NothingFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <h4>
        <Link to="/">Return to the main page</Link>
      </h4>

      <Outlet />
    </div>
  );
};

export default NothingFound;

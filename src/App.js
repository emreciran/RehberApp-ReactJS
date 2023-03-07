import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "./routes";

const App = () => {
  return (
    <>
      <main>
        <RouterProvider router={routes} />
        <ToastContainer />
      </main>
    </>
  );
};

export default App;

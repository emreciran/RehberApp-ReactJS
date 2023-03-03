import { Route, Routes } from "react-router-dom";
import PersonList from "./pages/Person/PersonList";
import Home from "./pages/Home";
import NewPerson from "./pages/NewPerson";
import PersonLayout from "./layouts/PersonLayout";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <main>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="persons" element={<PersonLayout />}>
                <Route index element={<PersonList />} />
                <Route path="create" element={<NewPerson />} />
              </Route>
            </Route>
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
        <ToastContainer />
      </main>
    </>
  );
};

export default App;

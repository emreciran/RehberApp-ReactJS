import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PersonList from "../pages/Person/PersonList";
import Home from "../pages/Home";
import NewPerson from "../pages/NewPerson";
import PersonLayout from "../layouts/PersonLayout";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import AdminLayout from "../layouts/AdminLayout";
import Admin from "../pages/Admin";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="persons" element={<PersonLayout />}>
            <Route index element={<PersonList />} />
            <Route path="create" element={<NewPerson />} />
          </Route>
        </Route>
        <Route path="admin" element={<AdminLayout allowedRoles={["Admin"]} />}>
          <Route index element={<Admin />} />
        </Route>
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot_password" element={<ForgotPassword />} />
        <Route path="reset_password" element={<ResetPassword />} />
      </Route>
    </Route>
  )
);

export default routes;

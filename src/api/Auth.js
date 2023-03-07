import axios from "../axios";

export const RegisterUser = async (data) =>
  await axios.post("/auth/register", data);

export const LoginUser = async (data) =>
  await axios.post("/auth/login", data, { withCredentials: true });

export const ForgotPasswordReq = async (email) =>
  await axios.post(`/auth/ForgotPassword?email=${email}`);

export const ResetPasswordReq = async (data) =>
  await axios.post("/auth/ResetPassword", data);

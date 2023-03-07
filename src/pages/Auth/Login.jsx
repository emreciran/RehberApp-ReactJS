import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginUser } from "../../api/Auth";
import { Formik } from "formik";
import { LoginSchema } from "../../validations";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";
import LoadingButton from '@mui/lab/LoadingButton';

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const notify = (error) => {
    toast.error(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  if (searchParams.get("confirmEmail") != null) {
    toast.success(
      "Email adresiniz onaylandı. Hesabınıza giriş yapabilirsiniz.",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
  }

  const initialValues = {
    email,
    password,
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true)
      const response = await LoginUser(values);
      dispatch(login(response.data.authResult.token));
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      if (error) {
        setLoading(false)
        notify(error.response.data.message);
      }
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={LoginSchema}
      >
        {({
          values,
          errors,
          handleSubmit,
          touched,
          handleChange,
          dirty,
          isSubmitting,
        }) => (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <ErrorMessage error={errors.email} />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <ErrorMessage error={errors.password} />
                )}
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={!dirty || isSubmitting}
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
              loadingIndicator="Loading…"
            >
              <span>Sign In</span>
            </LoadingButton>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link to="/auth/forgot_password" style={{ color: "#1976d2" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/auth/register" style={{ color: "#1976d2" }}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Login;

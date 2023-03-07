import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../api/Auth";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { RegisterSchema } from "../../validations";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingButton from '@mui/lab/LoadingButton';

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

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

  const initialValues = {
    name,
    surname,
    email,
    username,
    password,
    confirmPassword,
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true)
      await RegisterUser(values);
      navigate("/auth/login");
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
        Sign up
      </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={RegisterSchema}
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
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                  onChange={handleChange}
                />
                {errors.name && touched.name && (
                  <ErrorMessage error={errors.name} />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="surname"
                  label="Last Name"
                  name="surname"
                  onChange={handleChange}
                />
                {errors.surname && touched.surname && (
                  <ErrorMessage error={errors.surname} />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onChange={handleChange}
                />
                {errors.username && touched.username && (
                  <ErrorMessage error={errors.username} />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  onChange={handleChange}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <ErrorMessage error={errors.confirmPassword} />
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
              <span>Sign Up</span>
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/auth/login" style={{ color: "#1976d2" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Register;

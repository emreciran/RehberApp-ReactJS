import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { ResetPasswordSchema } from "../../validations";
import ErrorMessage from "../../components/ErrorMessage";
import { ResetPasswordReq } from "../../api/Auth";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const notify = (msg) => {
    toast.success(msg, {
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
    Email: searchParams.get("email"),
    Token: searchParams.get("token"),
    newPassword,
    confirmPassword,
  };

  const handleFormSubmit = async (values) => {
    try {
      await ResetPasswordReq(values);
      notify("Şifreniz başarıyla değiştirildi!");
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
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
        Reset Password
      </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={ResetPasswordSchema}
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
                  id="newPassword"
                  label="New Password"
                  type="password"
                  name="newPassword"
                  onChange={handleChange}
                />
                {errors.newPassword && touched.newPassword && (
                  <ErrorMessage error={errors.newPassword} />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!dirty || isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default ResetPassword;

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import { ResetPasswordSchema } from "../../validations";
import ErrorMessage from "../../components/ErrorMessage";
import { ResetPasswordReq } from "../../api/Auth";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { LoadingButton } from "@mui/lab";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [_showToast] = useToast();

  const navigate = useNavigate();

  const initialValues = {
    Email: searchParams.get("email"),
    Token: searchParams.get("token"),
    newPassword,
    confirmPassword,
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      await ResetPasswordReq(values);
      _showToast.showToast("success", "Şifreniz başarıyla değiştirildi!");
      navigate("/auth/login");
    } catch (error) {
      setLoading(false);
      _showToast.showToast("error", error.response.data.message);
    }
  };

  if (searchParams.get("email") == null || searchParams.get("token") == null) {
    return <Navigate to="/auth/login" replace="true" />;
  }

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
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={!dirty || isSubmitting}
              loading={loading}
              loadingIndicator="Loading..."
            >
              <span>Reset Password</span>
            </LoadingButton>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default ResetPassword;

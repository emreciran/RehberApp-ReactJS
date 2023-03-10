import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { ForgotPasswordReq } from "../../api/Auth";
import useToast from "../../hooks/useToast";
import { LoadingButton } from "@mui/lab";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [_showToast] = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ForgotPasswordReq(email);
      _showToast.showToast(
        "success",
        "Şifre yenileme bağlantısı email adresinize gönderildi!"
      );
      setLoading(false)
    } catch (error) {
      setLoading(false);
      _showToast.showToast("error", error.response.data.message);
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
        Forgot Password
      </Typography>

      <Box sx={{ mt: 2 }} component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          type="email"
          fullWidth
          id="email"
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          disabled={email === ""}
          sx={{ mt: 3, mb: 2, textTransform: "unset" }}
          loading={loading}
          loadingIndicator="Sending..."
        >
          <span>Send password reset email</span>
        </LoadingButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/auth/login" style={{ color: "#1976d2" }}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ForgotPassword;

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ForgotPasswordReq } from "../../api/Auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ForgotPasswordReq(email);
      notify("Şifre yenileme bağlantısı email adresinize gönderildi!");
    } catch (error) {
      console.log(error);
    }
  };

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
        <Button
          type="submit"
          fullWidth
          disabled={email === ""}
          variant="contained"
          sx={{ mt: 3, mb: 2, textTransform: "unset" }}
        >
          Send password reset email
        </Button>
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

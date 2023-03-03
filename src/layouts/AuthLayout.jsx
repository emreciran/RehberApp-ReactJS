import React from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

const AuthLayout = () => {
  return (
    <Container maxWidth="sm">
      <Outlet />
    </Container>
  );
};

export default AuthLayout;

import Container from "@mui/material/Container";
import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="xl">
      <h4>Ad: {user?.family_name}</h4>
      <h4>Soyad: {user?.family_name}</h4>
      <h4>Email: {user?.sub}</h4>
      <h4>Username: {user?.name}</h4>
    </Container>
  );
};

export default Home;

import Container from "@mui/material/Container";
import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="xl">

    </Container>
  );
};

export default Home;

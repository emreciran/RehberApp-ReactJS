import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import UpdateProfileModal from "./UpdateProfileModal";
import UpdatePswModal from "./UpdatePswModal";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openPswUpdateModal, setOpenPswUpdateModal] = useState(false);

  const handleClickOpenUpdate = () => {
    setOpenUpdateModal(true);
  };

  const handleClickOpenPswUpdate = () => {
    setOpenPswUpdateModal(true);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" marginTop={2}>
            <Paper variant="elevation" sx={{ padding: "20px" }}>
              <Avatar sx={{ marginBottom: 1 }} />
              <Typography component="h4" marginBottom={1}>
                <Typography component="span" variant="span" color="#777">
                  Ad:
                </Typography>{" "}
                {user?.given_name}
              </Typography>
              <Typography component="h4" marginBottom={1}>
                <Typography component="span" variant="span" color="#777">
                  Soyad:
                </Typography>{" "}
                {user?.family_name}
              </Typography>
              <Typography component="h4" marginBottom={1}>
                <Typography component="span" variant="span" color="#777">
                  Username:
                </Typography>{" "}
                {user?.name}
              </Typography>
              <Typography component="h4" marginBottom={1}>
                <Typography component="span" variant="span" color="#777">
                  Email:
                </Typography>{" "}
                {user?.sub}
              </Typography>
              <Typography component="h4" marginBottom={1}>
                <Typography component="span" variant="span" color="#777">
                  Role:
                </Typography>{" "}
                {user?.role}
              </Typography>
              <ButtonGroup sx={{ gap: 1 }}>
                <Button
                  size="medium"
                  variant="contained"
                  onClick={handleClickOpenUpdate}
                >
                  Update
                </Button>
                <Button
                  size="medium"
                  variant="contained"
                  color="warning"
                  onClick={handleClickOpenPswUpdate}
                >
                  Şifre Güncelle
                </Button>
              </ButtonGroup>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      <UpdateProfileModal
        openUpdateModal={openUpdateModal}
        setOpenUpdateModal={setOpenUpdateModal}
      />
      <UpdatePswModal
        openPswUpdateModal={openPswUpdateModal}
        setOpenPswUpdateModal={setOpenPswUpdateModal}
      />
    </Container>
  );
};

export default Profile;

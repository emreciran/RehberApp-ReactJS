import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { MuiTelInput } from "mui-tel-input";
import Container from "@mui/material/Container";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";

const NewPerson = () => {
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  const createPerson = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("USER_ID", user?.nameid);
    formData.append("PERSON_NAME", name);
    formData.append("PERSON_SURNAME", surname);
    formData.append("PERSON_PHONE", phone);
    formData.append("PERSON_DETAILS", details);
    formData.append("ImageFile", image);

    await axiosPrivate.post("/persons", formData);
    navigate("/persons");
  };

  const handleChange = (newPhone) => {
    setPhone(newPhone);
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Container maxWidth="md">
      <Box padding={5}>
        <Typography component="h5" variant="h5">
          Yeni Kullanıcı Ekle
        </Typography>
        <Box component="form" noValidate onSubmit={createPerson}>
          <TextField
            margin="dense"
            sx={{ marginBottom: 2 }}
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            margin="dense"
            sx={{ marginBottom: 2 }}
            id="surname"
            label="Surname"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
          />
          <MuiTelInput
            margin="dense"
            sx={{ marginBottom: 2 }}
            id="phone"
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={phone}
          />
          <TextField
            margin="dense"
            id="details"
            label="Details"
            type="text"
            fullWidth
            variant="standard"
            multiline
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
          <input
            type="file"
            name="file"
            onChange={(e) => handleFile(e)}
            accept="image/*"
            style={{ margin: "20px 0" }}
          />
          <Box sx={{ marginTop: 2 }}>
            <Button
              sx={{ marginRight: 1 }}
              variant="outlined"
              color="error"
              onClick={() => navigate("/persons")}
            >
              İptal
            </Button>
            <Button variant="contained" type="submit">
              Oluştur
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default NewPerson;

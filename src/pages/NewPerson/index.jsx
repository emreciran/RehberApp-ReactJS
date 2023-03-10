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
import useToast from "../../hooks/useToast";
import { LoadingButton } from "@mui/lab";

const NewPerson = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [_showToast] = useToast();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("USER_ID", user?.nameid);
      formData.append("PERSON_NAME", name);
      formData.append("PERSON_SURNAME", surname);
      formData.append("PERSON_PHONE", phone);
      formData.append("PERSON_DETAILS", details);
      formData.append("ImageFile", image);

      await axiosPrivate.post("/persons", formData);
      _showToast.showToast("success", "Yeni kullanıcı oluşturuldu.");
      navigate("/persons");
    } catch (error) {
      setLoading(false);
      _showToast.showToast("error", error.response.data.message);
    }
  };

  const handleChangePhone = (newPhone) => {
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
        <Box component="form" noValidate onSubmit={handleFormSubmit}>
          <TextField
            margin="dense"
            sx={{ marginBottom: 2 }}
            id="name"
            variant="standard"
            name="name"
            label="Name"
            type="text"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            sx={{ marginBottom: 2 }}
            id="surname"
            name="surname"
            variant="standard"
            label="Surname"
            type="text"
            fullWidth
            onChange={(e) => setSurname(e.target.value)}
          />
          <MuiTelInput
            margin="dense"
            sx={{ marginBottom: 2 }}
            id="PERSON_PHONE"
            label="Phone"
            variant="standard"
            type="text"
            fullWidth
            value={phone}
            onChange={handleChangePhone}
          />
          <TextField
            margin="dense"
            id="details"
            name="details"
            label="Details"
            variant="standard"
            type="text"
            fullWidth
            multiline
            onChange={(e) => setDetails(e.target.value)}
          />
          <input
            type="file"
            name="ImageFile"
            id="ImageFile"
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
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              loadingIndicator="Loading…"
            >
              <span>Oluştur</span>
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default NewPerson;

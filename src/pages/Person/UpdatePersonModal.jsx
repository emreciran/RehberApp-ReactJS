import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MuiTelInput } from "mui-tel-input";
import Button from "@mui/material/Button";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";

const UpdatePersonModal = ({ person, open, setOpen }) => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState(person.persoN_NAME);
  const [surname, setSurname] = useState(person.persoN_SURNAME);
  const [phone, setPhone] = useState(person.persoN_PHONE);
  const [details, setDetails] = useState(person.persoN_DETAILS);

  const handleChange = (newPhone) => {
    setPhone(newPhone);
  };

  const handleClose = () => {
    setOpen(false);
    setName(person.persoN_NAME);
    setSurname(person.persoN_SURNAME);
    setDetails(person.persoN_DETAILS);
    setPhone(person.persoN_PHONE);
  };

  const updatePerson = async () => {
    const data = {
      persoN_ID: person.persoN_ID,
      USER_ID: user?.nameid,
      persoN_NAME: name,
      persoN_SURNAME: surname,
      persoN_PHONE: phone,
      persoN_DETAILS: details,
      ImageName: person.imageName,
    };

    await axiosPrivate.put("/persons", data);
    setOpen(false);
    window.location.reload();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Güncelle</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
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
          multiline
          onChange={(e) => setDetails(e.target.value)}
          value={details}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          İptal
        </Button>
        <Button type="submit" onClick={() => updatePerson()}>
          Güncelle
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePersonModal;

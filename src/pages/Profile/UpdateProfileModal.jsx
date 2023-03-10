import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth";
import useToast from "../../hooks/useToast";

const UpdateProfileModal = ({ openUpdateModal, setOpenUpdateModal }) => {
  const { user } = useSelector((state) => state.auth);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch()

  const [_showToast] = useToast();

  const [name, setName] = useState(user.given_name);
  const [surname, setSurname] = useState(user.family_name);
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.sub);

  const data = {
    USER_ID: user.nameid,
    Name: name,
    Surname: surname,
    Username: username,
    Email: email,
  };

  const updateProfile = async () => {
    try {
      const response = await axiosPrivate.put("/users", data);
      _showToast.showToast("success", response.data.message + " Tekrar giriş yapınız.")
      dispatch(logout())
    } catch (error) {
      _showToast.showToast("error", error.response.data.message)
    }
  };

  const handleClose = () => {
    setOpenUpdateModal(false);
    setName(user.given_name);
    setSurname(user.family_name);
    setUsername(user.name);
    setEmail(user.sub);
  };

  return (
    <Dialog open={openUpdateModal} onClose={handleClose}>
      <DialogTitle>Profil Güncelle</DialogTitle>
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
        <TextField
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          variant="standard"
          value={username}
          disabled
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          disabled
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          İptal
        </Button>
        <Button type="submit" onClick={() => updateProfile()}>
          Güncelle
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProfileModal;

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth";
import { toast } from "react-toastify";

const UpdatePswModal = ({ openPswUpdateModal, setOpenPswUpdateModal }) => {
  const [currPassword, setCurrPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = useSelector((state) => state.auth);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenPswUpdateModal(false);
    setPassword("");
    setConfirmPassword("");
  };

  const notifySuccess = (msg) => {
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

  const notifyError = (error) => {
    toast.error(error, {
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

  const data = {
    Email: user.sub,
    CurrentPassword: currPassword,
    NewPassword: password,
    ConfirmPassword: confirmPassword,
  };

  const updateUserPsw = async () => {
    try {
      const response = await axiosPrivate.put("/users/UpdatePassword", data);
      notifySuccess(response.data.message + " Tekrar giriş yapınız.")
      dispatch(logout());
    } catch (error) {
        notifyError(error.response.data.message)
    }
  };

  return (
    <Dialog open={openPswUpdateModal} onClose={handleClose}>
      <DialogTitle>Şifre Güncelle</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="curPassword"
          label="Current Password"
          type="password"
          fullWidth
          variant="standard"
          onChange={(e) => setCurrPassword(e.target.value)}
          value={currPassword}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <TextField
          margin="dense"
          id="confirmpassword"
          label="Confirm Password"
          type="password"
          fullWidth
          variant="standard"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          İptal
        </Button>
        <Button type="submit" onClick={() => updateUserPsw()}>
          Güncelle
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePswModal;

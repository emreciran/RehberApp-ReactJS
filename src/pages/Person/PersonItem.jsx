import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import UpdatePersonModal from "./UpdatePersonModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useToast from "../../hooks/useToast";

const PersonItem = ({ person, fetchAllPersons }) => {
  const [open, setOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const [_showToast] = useToast();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const deletePerson = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Emin misin?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Evet, sil!",
        cancelButtonText: "Hayır, iptal et!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axiosPrivate.delete(`/persons/${person.persoN_ID}`);
          _showToast.showToast("success", "Kullanıcı silindi!");
          await fetchAllPersons();
          swalWithBootstrapButtons.fire(
            "Silindi!",
            "Kullanıcı başarıyla silindi!",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "İptal edildi!",
            "Kullanıcı silinmedi!",
            "error"
          );
        }
      });
  };

  return (
    <>
      <Card sx={{ maxWidth: 365, marginTop: 2 }}>
        <CardMedia
          sx={{ height: 180 }}
          image={`https://localhost:7061/Images/${person.imageName}`}
          title={person.persoN_NAME}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {person.persoN_NAME} {person.persoN_SURNAME}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {person.persoN_PHONE}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {person.persoN_DETAILS}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="error" onClick={() => deletePerson()}>
            Delete
          </Button>
          <Button size="small" onClick={handleClickOpen}>
            Update
          </Button>
        </CardActions>
      </Card>
      <UpdatePersonModal person={person} open={open} setOpen={setOpen} />
    </>
  );
};

export default PersonItem;

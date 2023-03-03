import { Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import PersonItem from "./PersonItem";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const actions = [
  { icon: <CreateIcon />, name: "New", navigate: "/persons/create" },
];

const PersonList = () => {
  const navigate = useNavigate();
  const [persons, setPersons] = useState();

  const axiosPrivate = useAxiosPrivate();

  const fetchAllPersons = async () => {
    const personsData = await axiosPrivate.get("/persons");
    setPersons(personsData.data);
  };

  useEffect(() => {
    fetchAllPersons();
  }, []);

  return (
    <Box marginTop={2}>
      <Grid container spacing={2}>
        {Array.isArray(persons) ? (
          persons?.map((person) => (
            <Grid item xs={12} md={6} lg={3} key={person.persoN_ID}>
              <PersonItem person={person} fetchAllPersons={fetchAllPersons} />
            </Grid>
          ))
        ) : (
          <Typography component="h4" variant="h4">
            {persons}
          </Typography>
        )}
      </Grid>

      <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => navigate(action.navigate)}
            />
          ))}
        </SpeedDial>
      </Box>
    </Box>
  );
};

export default PersonList;

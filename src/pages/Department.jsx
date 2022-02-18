/* eslint-disable */
import axios from "axios";
import React, { Suspense, lazy } from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { getUser } from "../User";
import { Container } from "@material-ui/core";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import DepartmentCard from "../components/DepartmentCard";

import Grid from "@mui/material/Grid";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import cover from "../assets/images/cover.jpg";

const theme = createTheme({
  typography: {
    fontFamily: ["Irish Grover", "cursive"].join(","),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  grid: {
    alignItems: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

/* eslint-disable */
export default function Department() {
  const classes = useStyles();

  const [departments, setDepartments] = useState([]);

  var csrftoken = Cookies.get("csrftoken");
  let config = {
    headers: {
      "X-CSRFToken": csrftoken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const user = getUser();

  const getDepartments = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACK_END_URL + "/api/departments/",
        config
      );

      if (res) {
        setDepartments(res.data);
      }
    } catch (error) {
      // window.alert(process.env.REACT_APP_BACK_END_URL);
      console.log(error);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <div className={classes.root}>
      <img src={cover} width="100%" />
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <ThemeProvider theme={theme}>
            <Typography
              variant="h3"
              component="div"
              sx={{
                marginTop: 5,
                marginBottom: 5,
                color: "#000000",
              }}
            >
              MENU
            </Typography>
          </ThemeProvider>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            {departments.length == 0 ? (
              <CircularProgress color="error" />
            ) : (
              <div></div>
            )}

            {departments.map((row) => (
              <Grid item key={row.department_id} xs={6} md={4}>
                <DepartmentCard
                  key={row.department_id}
                  id={row.department_id}
                  department={row}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
}

/* eslint-disable */
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { getUser } from "../User";
import { Container } from "@material-ui/core";
import Cookies from "js-cookie";
import DepartmentCard from "../components/DepartmentCard";

import Grid from "@mui/material/Grid";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

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
      console.log(error);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <div className={classes.root}>
      <img
        src="https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/56517146_921280151596718_4611876032075530240_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=e3f864&_nc_ohc=O7IrPml-0s0AX9Nu82Q&_nc_ht=scontent.fdac22-1.fna&oh=d1290368ee57a34300bd0b813d06a2c1&oe=61B229D0"
        width="100%"
        loading="lazy"
      />
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
          <Grid container spacing={3} alignItems="center">
            {departments.map((row) => (
              <Grid item key={row.category_id} xs={12} md={4}>
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

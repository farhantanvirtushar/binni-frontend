/* eslint-disable */
import { React, useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { getUser } from "../User";
import Cookies from "js-cookie";

import axios from "axios";

import { useParams } from "react-router-dom";

import CategoryCard from "../components/CategoryCard";

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

export default function DepartmentCategories(props) {
  const classes = useStyles();

  let { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [department, setDepartment] = useState({});

  var csrftoken = Cookies.get("csrftoken");
  let config = {
    headers: {
      "X-CSRFToken": csrftoken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const user = getUser();

  const getDepartment = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACK_END_URL + "/api/departments/" + id,
        config
      );

      if (res) {
        setDepartment(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACK_END_URL + "/api/categories/department/" + id,
        config
      );

      if (res) {
        setCategories(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDepartment();
    getCategories();
  }, []);
  return (
    <div className={classes.root}>
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
              {department.name}
            </Typography>
          </ThemeProvider>
          <Grid
            container
            spacing={3}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            {categories.length == 0 ? (
              <CircularProgress color="error" />
            ) : (
              <div></div>
            )}

            {categories.map((row) => (
              <Grid item xs={6} md={4}>
                <CategoryCard
                  id={row.category_id}
                  category={row}
                  cart={props.cart}
                  setCart={props.setCart}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
}

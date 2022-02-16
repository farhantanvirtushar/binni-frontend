/* eslint-disable */
import { React, useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import CircularProgress from "@mui/material/CircularProgress";

import Cookies from "js-cookie";
import ProductCard from "./ProductCard";

import axios from "axios";

import { BrowserRouter as Router, useParams } from "react-router-dom";

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

export default function AllProducts(props) {
  const classes = useStyles();

  let { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  var csrftoken = Cookies.get("csrftoken");
  let config = {
    headers: {
      "X-CSRFToken": csrftoken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const getCategory = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACK_END_URL + "/api/categories/" + id,
        config
      );

      if (res) {
        setCategory(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACK_END_URL + "/api/categories/" + id + "/all",
        config
      );

      if (res) {
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
    getProducts();
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
              {category.name}
            </Typography>
          </ThemeProvider>
          <Grid
            container
            spacing={3}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            {products.length == 0 ? (
              <CircularProgress color="error" />
            ) : (
              <div></div>
            )}

            {products.map((row) => (
              <Grid item xs={12} md={4}>
                <ProductCard
                  id={row.product_id}
                  product={row}
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

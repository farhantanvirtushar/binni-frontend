import axios from "axios";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { getUser } from "../User";
import { Container } from "@material-ui/core";
import Cookies from "js-cookie";
import ProductCard from "./ProductCard";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
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

  const user = getUser();

  const getCategory = async () => {
    try {
      const res = await axios.get("/api/categories/" + id, config);

      if (res) {
        setCategory(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("/api/categories/" + id + "/all", config);

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
      <Container component="main" maxWidth="md">
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
          <Grid container spacing={1}>
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

import axios from "axios";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { getUser } from "../User";
import { Container } from "@material-ui/core";
import Cookies from "js-cookie";
import CategoryCard from "./CategoryCard";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const theme = createTheme({
  typography: {
    fontFamily: ["Irish Grover", "cursive"].join(","),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#439dce",
    borderRadius: 10,

    marginBottom: theme.spacing(5),
  },
}));

export default function FoodMenu() {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);

  var csrftoken = Cookies.get("csrftoken");
  let config = {
    headers: {
      "X-CSRFToken": csrftoken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const user = getUser();

  const getCategories = async () => {
    try {
      const res = await axios.get("/api/categories/", config);

      if (res) {
        setCategories(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Container component="main" maxWidth="md">
      <ThemeProvider theme={theme}>
        <Typography
          variant="h3"
          component="div"
          sx={{
            flexGrow: 1,
            color: "#000000",
          }}
        >
          MENU
        </Typography>
      </ThemeProvider>
      <div className={classes.root}>
        {categories.map((row) => (
          <CategoryCard />
        ))}
      </div>
    </Container>
  );
}

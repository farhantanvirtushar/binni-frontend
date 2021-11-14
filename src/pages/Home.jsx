/* eslint-disable */
import React from "react";
import { useHistory } from "react-router-dom";

import { Box, Container, Grid, Menu } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { getUser, updateUser } from "../User";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import Cookies from "js-cookie";

import { makeStyles } from "@material-ui/core/styles";
import Topbar from "../components/Topbar";
import FoodMenu from "../components/FoodMenu";
import AllProducts from "../components/AllProducts";
import CheckOut from "./CheckOut";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  userInfo: {
    // Fix IE 11 issue.
    marginBottom: 10,
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  row: {
    marginBottom: theme.spacing(5),
  },
  topbar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Home() {
  const classes = useStyles();

  const [cart, setCart] = useState({});
  const history = useHistory();
  let user = getUser();

  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    localStorage.clear();

    window.location.reload();
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Router>
        <Topbar cart={cart} setCart={setCart} />

        <div>
          <Box component="main" sx={{ p: 3 }}>
            <Switch>
              <Route exact path="/">
                <FoodMenu />
              </Route>
              <Route exact path="/menu/:id">
                <AllProducts cart={cart} setCart={setCart} />
              </Route>
              <Route exact path="/checkout">
                <CheckOut cart={cart} setCart={setCart} />
              </Route>
            </Switch>
          </Box>
        </div>
      </Router>
    </div>
  );
}

/* eslint-disable */
import React from "react";

import { Box } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useState } from "react";

import Topbar from "../components/Topbar";
import Department from "./Department";
import AllProducts from "../components/AllProducts";
import CheckOut from "./CheckOut";
import DepartmentCategories from "./DepartmentCategories";
import Caterings from "./Caterings";
import About from "./About";
import Footer from "../components/Footer";

export default function Home() {
  var saved_cart = localStorage.getItem("cart");

  if (!saved_cart) {
    saved_cart = {};
  } else {
    saved_cart = JSON.parse(saved_cart);
  }

  const [cart, setCart] = useState(saved_cart);

  return (
    <div>
      <Router>
        <Topbar cart={cart} setCart={setCart} />

        <div>
          <Box component="main" sx={{ pt: 3 }}>
            <Switch>
              <Route exact path="/">
                <Department />
              </Route>
              <Route exact path="/department/:id">
                <DepartmentCategories cart={cart} setCart={setCart} />
              </Route>
              <Route exact path="/menu/:id">
                <AllProducts cart={cart} setCart={setCart} />
              </Route>
              <Route exact path="/checkout">
                <CheckOut cart={cart} setCart={setCart} />
              </Route>
              <Route exact path="/caterings">
                <Caterings />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
            </Switch>
          </Box>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

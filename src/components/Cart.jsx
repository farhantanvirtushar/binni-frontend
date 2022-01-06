/* eslint-disable */
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CartItem from "./CartItem";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "@mui/icons-material/Delete";

import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    overflowX: "hidden",
  },
}));

export default function Cart(props) {
  const classes = useStyles();

  var saved_price_list = localStorage.getItem("priceList");

  if (!saved_price_list) {
    saved_price_list = {};
  } else {
    saved_price_list = JSON.parse(saved_price_list);
  }

  var initial_price_list = {};
  for (var key in props.cart) {
    // initital total price = saved price per product * quantity of product
    initial_price_list[key] = saved_price_list[key] * props.cart[key];
  }

  const [priceList, setPriceList] = useState(initial_price_list);

  var csrftoken = Cookies.get("csrftoken");
  let config = {
    headers: {
      "X-CSRFToken": csrftoken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const updatePriceList = (product_id, quantity, product_price) => {
    var temp_priceList = { ...priceList };
    temp_priceList[product_id] = quantity * product_price;

    console.log("====================================");
    console.log(temp_priceList);
    console.log("====================================");
    setPriceList(temp_priceList);
  };

  const getTotal = () => {
    var total_price = 0;

    for (var key in priceList) {
      total_price += priceList[key];
    }

    props.setTotal(total_price);
  };
  const handleDelete = async (row) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACK_END_URL +
          "/api/categories/" +
          row.category_id +
          "/delete",
        config
      );

      if (res) {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log("====================================");
    // console.log("changed price list");
    // console.log(priceList);
    // console.log("====================================");
    getTotal();
  }, [priceList]);
  return (
    <div className={classes.root}>
      <Paper>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(props.cart).map((key, index) => (
                <CartItem
                  id={key}
                  key={key}
                  quantity={props.cart[key]}
                  cart={props.cart}
                  setCart={props.setCart}
                  updatePriceList={updatePriceList}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

/* eslint-disable */
import React from "react";
import { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Alert from "@mui/material/Alert";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height: 100,
    width: 100,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CartItem(props) {
  const classes = useStyles();

  const [quantity, setQuantity] = useState(props.quantity);
  const [product, setProduct] = useState({});

  var csrftoken = Cookies.get("csrftoken");
  let config = {
    headers: {
      "X-CSRFToken": csrftoken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const handleDelete = () => {};

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    var temp_cart = { ...props.cart };
    var count = parseInt(event.target.value);
    if (isNaN(count)) {
      count = 0;
    }
    temp_cart[props.id] = count;
    props.setCart(temp_cart);
    localStorage.setItem("cart", JSON.stringify(temp_cart));
    updatePriceList(count);
  };

  const updatePriceList = (count) => {
    props.updatePriceList(product.product_id, count, product.price);
  };

  const getProduct = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACK_END_URL + "/api/products/" + props.id,
        config
      );

      if (res) {
        setProduct(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <TableRow key={product.product_id}>
      <TableCell align="center">
        <img src={product.image_url} height="50" loading="lazy" />
      </TableCell>
      <TableCell align="left">{product.title}</TableCell>
      <TableCell align="left">
        <TextField
          autoFocus
          type="number"
          margin="dense"
          id="quantity"
          label="Quantity"
          variant="outlined"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </TableCell>
      <TableCell align="left">{product.price * quantity} /-</TableCell>
      <TableCell align="center">
        <IconButton
          style={{
            color: "#ff0000",
          }}
          aria-label="add to shopping cart"
          onClick={(event) => {
            handleDelete();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

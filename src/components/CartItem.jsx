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
import Box from "@material-ui/core/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Collapse from "@mui/material/Collapse";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import MuiPhoneNumber from "material-ui-phone-number";
import CircularProgress from "@mui/material/CircularProgress";
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

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});

  var csrftoken = Cookies.get("csrftoken");
  let config = {
    headers: {
      "X-CSRFToken": csrftoken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    var temp_cart = { ...props.cart };
    var count = parseInt(event.target.value);
    if (isNaN(count)) {
      count = 0;
    }
    temp_cart[props.id] = count;
    console.log("====================================");
    console.log(temp_cart);
    console.log("====================================");
    props.setCart(temp_cart);
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
    <div className={classes.paper}>
      <Grid container spacing={2} alignItems="center" alignContent="center">
        <Grid item xs={2}>
          <img src={product.image_url} width="100%" loading="lazy" />
        </Grid>
        <Grid item xs={2}>
          {product.title}
        </Grid>
        <Grid item xs={4}>
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
        </Grid>
        <Grid item xs={4}>
          Price = {product.price * quantity}
        </Grid>
      </Grid>
    </div>
  );
}

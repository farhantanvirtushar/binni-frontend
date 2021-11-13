import React from "react";
import { useState, useRef } from "react";
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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
import CartItem from "../components/CartItem";

import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";

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

export default function CheckOut(props) {
  const classes = useStyles();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [phone, setPhone] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrderSubmit = async (event) => {
    setSubmitted(true);
    event.preventDefault();

    var csrftoken = Cookies.get("csrftoken");
    let config = {
      headers: {
        "X-CSRFToken": csrftoken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const data = {
      first_name: firstname,
      last_name: lastname,
      contact_no: phone,
      shipping_address: address,
      cart: props.cart,
    };

    try {
      const res = await axios.post("/api/orders/new", data, config);
      if (res) {
        let data = res.data;
        setOpen(true);
        setSubmitted(false);
      }
    } catch (error) {
      setSubmitted(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Shopping Cart
        </Typography>
        <Grid container spacing={2} style={{ marginBottom: 10 }}>
          {Object.keys(props.cart).map((key, index) => (
            <Grid item xs={12}>
              <CartItem id={key} cart={props.cart} setCart={props.setCart} />
            </Grid>
          ))}
        </Grid>
        <Typography component="h1" variant="h5">
          Shipping Address
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event) => setFirstname(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(event) => setLastname(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <MuiPhoneNumber
                variant="outlined"
                fullWidth
                defaultCountry={"bd"}
                onChange={(value) => setPhone(value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Shipping Address"
                type="address"
                id="address"
                onChange={(event) => setAddress(event.target.value)}
              />
            </Grid>
          </Grid>
          <div className={classes.paper}>
            {!submitted ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleOrderSubmit}
              >
                Confirm Submission
              </Button>
            ) : (
              <CircularProgress />
            )}
          </div>
        </form>
      </div>
      <Dialog open={open}>
        <DialogTitle>Order Recieved</DialogTitle>
        <DialogContent>Thank you</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

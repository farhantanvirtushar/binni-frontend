/* eslint-disable */
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiPhoneNumber from "material-ui-phone-number";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Cookies from "js-cookie";
import Cart from "../components/Cart";
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
  payment: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#f37553",
    color: "#ffffff",
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paymentInfo: {
    width: "100%",
    margin: 5,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 15,
  },
  inputColor: {
    color: "#ffffff",
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
  const [paymentAccountNo, setPaymentAccountNo] = useState("");
  const [transID, setTransID] = useState("");

  const [total, setTotal] = useState(0);
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
      payment_account_no: paymentAccountNo,
      transaction_id: transID,
      paid: total * 0.25,
      cart: props.cart,
    };

    try {
      const res = await axios.post(
        process.env.REACT_APP_BACK_END_URL + "/api/orders/new",
        data,
        config
      );
      if (res) {
        let data = res.data;
        setOpen(true);
        setSubmitted(false);
        localStorage.removeItem("cart");
        localStorage.removeItem("priceList");
        props.setCart({});
        setTotal(0);
      }
    } catch (error) {
      setSubmitted(false);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Shopping Cart
        </Typography>
        <Cart
          cart={props.cart}
          setCart={props.setCart}
          total={total}
          setTotal={setTotal}
        />
        <br />
        <Typography component="h1" variant="h5">
          Total : {total} /-
        </Typography>
        <br />

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
                label="Contact No"
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
          <div className={classes.payment}>
            <Typography component="h1" variant="h4">
              Pay 25% in advance to confirm the order
            </Typography>
            <Typography variant="body2">
              <ul>
                <li>Pay BDT {total * 0.25} /- in bkash</li>
                <li>Enter bkash mobile no and transaction ID below</li>
              </ul>
            </Typography>

            <div className={classes.paymentInfo}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <MuiPhoneNumber
                    variant="outlined"
                    label="Bkash Mobile Number"
                    fullWidth
                    defaultCountry={"bd"}
                    onChange={(value) => setPaymentAccountNo(value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    color="success"
                    name="transID"
                    label="Transaction ID"
                    id="transID"
                    onChange={(event) => setTransID(event.target.value)}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
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

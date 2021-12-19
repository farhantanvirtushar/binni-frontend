/* eslint-disable */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid } from "@material-ui/core";
import { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import Cookies from "js-cookie";
import { getAdmin } from "../../../User";

import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  row: {
    width: "100%",
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function OrderDetails(props) {
  const classes = useStyles();

  const [orderedItems, setOrderedItems] = useState([]);
  const [total, setTotal] = useState(0);

  let admin = getAdmin();

  if (admin == null) {
    window.location.replace("/admin/login");
  }

  var csrftoken = Cookies.get("csrftoken");
  let config = {
    headers: {
      "X-CSRFToken": csrftoken,
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + admin.token,
    },
  };

  const getOrderedItems = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACK_END_URL +
          "/api/orders/" +
          props.order.order_id +
          "/details",
        config
      );

      if (res) {
        setOrderedItems(res.data);
        setTotal(getTotal(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = (data) => {
    var total = 0;

    for (var i = 0; i < data.length; i++) {
      total += data[i].quantity * data[i].price;
    }
    return total;
  };
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async () => {
    props.setOpen(false);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderedItems();
  }, [props.open]);

  return (
    <Paper>
      <Dialog open={props.open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Typography variant="h4" component="div">
            Order Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div className={classes.form}>
            <div className={classes.row}>
              <Typography variant="body1">
                Tracing Number : {props.order.order_id}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography variant="body1">
                Name : {props.order.first_name + " " + props.order.last_name}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography variant="body1">
                Contact No : {props.order.contact_no}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography variant="body1">
                Shipping Address : {props.order.shipping_address}
              </Typography>
            </div>

            <div className={classes.row}>
              <Typography variant="h4" component="div">
                Ordered Items
              </Typography>
            </div>
            {orderedItems.map((row) => (
              <div className={classes.row}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  alignContent="center"
                >
                  <Grid item xs={3}>
                    <img src={row.image_url} height="50" loading="lazy" />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1">{row.title}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1">
                      {row.quantity + " " + row.unit}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1">
                      {row.quantity * row.price} BDT
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            ))}
            <div className={classes.row}>
              <Typography variant="h6" component="div">
                Total : {total} BDT
              </Typography>
            </div>

            <div className={classes.row}>
              <Typography variant="h4" component="div">
                Payment Details
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography variant="body1">
                Paid : {props.order.paid} BDT
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography variant="body1">
                Bkash No : {props.order.payment_account_no}
              </Typography>
            </div>
            <div className={classes.row}>
              <Typography variant="body1">
                Transaction ID : {props.order.transaction_id}
              </Typography>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
          {/* <Button onClick={handleSubmit}>Submit</Button> */}
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

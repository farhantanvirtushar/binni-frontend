/* eslint-disable */
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import IconButton from "@mui/material/IconButton";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "@mui/icons-material/Delete";

import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import { getAdmin } from "../../../User";
import OrderDetails from "./OrderDetails";

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

export default function OrderList(props) {
  const classes = useStyles();

  var orders = props.orders;

  const [open, setOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState({});

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
  return (
    <Paper className={classes.root}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Tracking Number</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Contact No</TableCell>
              <TableCell align="left">Bkash No</TableCell>
              <TableCell align="left">Transaction ID</TableCell>
              <TableCell align="left">Shipping Address</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow key={row.order_id}>
                <TableCell align="center">{row.order_id}</TableCell>
                <TableCell align="left">
                  {row.first_name + " " + row.last_name}
                </TableCell>
                <TableCell align="left">{row.contact_no}</TableCell>
                <TableCell align="left">{row.payment_account_no}</TableCell>
                <TableCell align="left">{row.transaction_id}</TableCell>
                <TableCell align="left">{row.shipping_address}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={(event) => {
                      setOrderToEdit(row);
                      setOpen(true);
                    }}
                  >
                    <OpenInNewIcon />
                  </IconButton>
                  <IconButton
                    style={{
                      color: "#ff0000",
                    }}
                    aria-label="add to shopping cart"
                    onClick={(event) => {
                      // handleDelete(row);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <OrderDetails open={open} setOpen={setOpen} order={orderToEdit} />
    </Paper>
  );
}

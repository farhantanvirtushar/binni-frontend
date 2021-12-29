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

export default function OrderedItems(props) {
  const classes = useStyles();

  var orderedItems = props.orderedItems;

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

  return (
    <Paper className={classes.root}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Code</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedItems.map((row) => (
              <TableRow key={row.product_id}>
                <TableCell align="center">{row.code}</TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">
                  {row.quantity + " " + row.unit}
                </TableCell>
                <TableCell align="left">
                  {row.quantity * row.price} BDT
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

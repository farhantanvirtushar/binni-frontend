/* eslint-disable */
import { React, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import { styled } from "@mui/material/styles";
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#f37553",
  color: theme.palette.common.white,
  fontSize: 20,
}));

export default function CateringMenuDetails(props) {
  const classes = useStyles();

  var catering = props.catering;
  var menuItems = [];
  menuItems = catering.catering_menu.split(";");
  menuItems.pop();

  var csrftoken = Cookies.get("csrftoken");
  let config = {
    headers: {
      "X-CSRFToken": csrftoken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return (
    <Paper className={classes.root}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">{catering.name}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item}>
                <TableCell align="left">{item}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

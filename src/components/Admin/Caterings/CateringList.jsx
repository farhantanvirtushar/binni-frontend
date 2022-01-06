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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import Cookies from "js-cookie";
import { getAdmin } from "../../../User";
import EditCatering from "./EditCatering";

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

export default function CateringList(props) {
  const classes = useStyles();

  var caterings = props.caterings;

  const [open, setOpen] = useState(false);
  const [cateringToEdit, setCateringToEdit] = useState({});

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
      const res = await axios.delete(
        process.env.REACT_APP_BACK_END_URL +
          "/api/caterings/" +
          row.catering_id,
        config
      );

      if (res) {
        res.data.sort(props.compare);
        props.setCaterings(res.data);
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
              <TableCell align="left">Catering Name</TableCell>
              <TableCell align="left">Catering Menu</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {caterings.map((row) => (
              <TableRow key={row.category_id}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.catering_menu}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={(event) => {
                      setCateringToEdit(row);
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    style={{
                      color: "#ff0000",
                    }}
                    aria-label="add to shopping cart"
                    onClick={(event) => {
                      handleDelete(row);
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
      <EditCatering
        catering={cateringToEdit}
        open={open}
        setOpen={setOpen}
        setCaterings={props.setCaterings}
        compare={props.compare}
      />
    </Paper>
  );
}

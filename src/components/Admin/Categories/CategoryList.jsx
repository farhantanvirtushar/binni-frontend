import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";
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

export default function CategoryList(props) {
  const classes = useStyles();

  var categories = props.categories;

  const [open, setOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState({});

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
        "/api/categories/" + row.category_id + "/delete",
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
              <TableCell align="left">Cover Image</TableCell>
              <TableCell align="left">Category Name</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row) => (
              <TableRow key={row.category_id}>
                <TableCell align="left">
                  <img
                    src={row.category_image_url}
                    height="50"
                    loading="lazy"
                  />
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={(event) => {
                      // setCategoryToEdit(row);
                      // setOpen(true);
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
    </Paper>
  );
}

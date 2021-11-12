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

import EditProduct from "./EditProduct";

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

export default function ProductList(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});

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
      const data = {
        categoryId: row.category_id,
      };

      const res = await axios.post(
        "/api/products/" + row.product_id + "/delete",
        data,
        config
      );

      if (res) {
        props.setProducts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  var products = props.products;
  return (
    <Paper className={classes.root}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Photo</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Buying Price</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Unit</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.product_id}>
                <TableCell align="left">
                  <img src={row.image_url} height="50" loading="lazy" />
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="center">{row.stock}</TableCell>
                <TableCell align="center">{row.buying_price}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.unit}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={(event) => {
                      setProductToEdit(row);
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

      <EditProduct
        product={productToEdit}
        open={open}
        setOpen={setOpen}
        setProducts={props.setProducts}
      />
    </Paper>
  );
}

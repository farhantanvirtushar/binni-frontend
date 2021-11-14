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
    marginTop: theme.spacing(5),

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function EditProduct(props) {
  const classes = useStyles();

  const [title, setTitle] = useState(props.product.title);
  const [description, setDescription] = useState(props.product.description);
  const [stock, setStock] = useState(props.product.stock);
  const [buyingPrice, setBuyingPrice] = useState(props.product.buying_price);
  const [price, setPrice] = useState(props.product.price);
  const [unit, setUnit] = useState(props.product.unit);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = async () => {
    props.setOpen(false);
    try {
      const data = new FormData();
      data.append("image", selectedFile);
      data.append("image_url", props.product.image_url);
      data.append("title", title);
      data.append("description", description);
      data.append("stock", stock);
      data.append("price", price);
      data.append("buying_price", buyingPrice);
      data.append("unit", unit);
      data.append("category_id", props.product.category_id);

      const res = await axios.put(
        process.env.REACT_APP_BACK_END_URL +
          "/api/products/" +
          props.product.product_id,
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

  useEffect(() => {
    setTitle(props.product.title);
    setDescription(props.product.description);
    setStock(props.product.stock);
    setBuyingPrice(props.product.buying_price);
    setPrice(props.product.price);
    setUnit(props.product.unit);
    setSelectedFile(null);
  }, [props.open]);

  return (
    <Paper>
      <Dialog open={props.open} onClose={handleClose} fullWidth>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <div className={classes.form}>
            <img src={props.product.image_url} width="100%" loading="lazy" />
            <div className={classes.row}>
              <Typography variant="h5" component="div">
                Change Cover Image :
              </Typography>
              <input
                id="id_image"
                type="file"
                name="imagefile"
                onChange={onFileChange}
              />
            </div>
            <div className={classes.row}>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>

            <TextField
              autoFocus
              multiline
              fullWidth
              margin="dense"
              id="description"
              label="Description"
              variant="outlined"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />

            <TextField
              autoFocus
              type="number"
              margin="dense"
              id="stock"
              label="Stock"
              variant="outlined"
              value={stock}
              onChange={(event) => {
                setStock(event.target.value);
              }}
            />
            <div>
              <TextField
                autoFocus
                type="number"
                margin="dense"
                id="buyingPrice"
                label="Buying Price"
                variant="outlined"
                value={buyingPrice}
                onChange={(event) => {
                  setBuyingPrice(event.target.value);
                }}
              />
              <TextField
                autoFocus
                type="number"
                margin="dense"
                id="price"
                label="Price"
                variant="outlined"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>

            <FormControl variant="filled" sx={{ minWidth: 200 }}>
              <InputLabel id="demo-simple-select-label">Select Unit</InputLabel>
              <Select
                labelId="category-select-label"
                id="unit-select"
                value={unit}
                label="Select Category"
                onChange={(event) => {
                  setUnit(event.target.value);
                }}
              >
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="piece">piece</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

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
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function CreateProduct(props) {
  const classes = useStyles();

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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [buyingPrice, setBuyingPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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
      data.append("title", title);
      data.append("description", description);
      data.append("stock", stock);
      data.append("price", price);
      data.append("buying_price", buyingPrice);
      data.append("unit", unit);

      console.log("====================================");
      console.log(data);
      console.log("====================================");
      const res = await axios.post(
        process.env.REACT_APP_BACK_END_URL +
          "/api/categories/" +
          props.categoryID +
          "/new",
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

  useEffect(() => {}, []);

  return (
    <Paper>
      <Dialog open={props.open} onClose={handleClose} fullWidth>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <div className={classes.form}>
            <div className={classes.row}>
              <Typography variant="h5" component="div">
                Cover Image :
              </Typography>
              <input
                id="id_image"
                type="file"
                name="imagefile"
                onChange={onFileChange}
              />
            </div>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              variant="outlined"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />

            <TextField
              autoFocus
              multiline
              fullWidth
              margin="dense"
              id="description"
              label="Description"
              variant="outlined"
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

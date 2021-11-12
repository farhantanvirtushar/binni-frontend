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

export default function CreateCategory(props) {
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

  const [categoryName, setCategoryName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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
      data.append("categoryName", categoryName);

      const res = await axios.post("/api/categories/new", data, config);

      if (res) {
        props.setCategories(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <Paper>
      <Dialog open={props.open} onClose={handleClose} fullWidth>
        <DialogTitle>Add New Category</DialogTitle>
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
            <div className={classes.row}>
              <TextField
                autoFocus
                margin="dense"
                id="outlined-basic"
                label="Category Name"
                variant="outlined"
                onChange={(event) => {
                  setCategoryName(event.target.value);
                }}
              />
            </div>
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

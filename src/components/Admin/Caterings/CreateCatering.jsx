/* eslint-disable */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { Chip } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
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

/* eslint-disable */
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

export default function CreateCatering(props) {
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

  const [cateringName, setCateringName] = useState("");
  const [cateringMenu, setCateringMenu] = useState([]);

  const defaultOptions = [];

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async () => {
    props.setOpen(false);
    try {
      var catering_menu = "";
      cateringMenu.forEach((item) => {
        catering_menu += item + ";";
      });

      var data = {
        name: cateringName,
        catering_menu: catering_menu,
      };

      const res = await axios.post(
        process.env.REACT_APP_BACK_END_URL + "/api/caterings/new",
        data,
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

  useEffect(() => {}, []);

  return (
    <Paper>
      <Dialog open={props.open} onClose={handleClose} fullWidth>
        <DialogTitle>Add New Catering</DialogTitle>
        <DialogContent>
          <div className={classes.form}>
            <div className={classes.row}>
              <TextField
                autoFocus
                margin="dense"
                id="outlined-basic"
                label="Catering Name"
                variant="outlined"
                onChange={(event) => {
                  setCateringName(event.target.value);
                }}
              />
            </div>
            <div className={classes.row}>
              <Autocomplete
                multiple
                fullWidth
                id="tags-filled"
                options={defaultOptions}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      color="primary"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Catering Menu" />
                )}
                onChange={(event, value) => setCateringMenu(value)}
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

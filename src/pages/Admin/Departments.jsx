/* eslint-disable */
import React from "react";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Typography } from "@mui/material";

import axios from "axios";

import { getAdmin } from "../../User";

import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import CreateDepartment from "../../components/Admin/Departments/CreateDepartment";
import DepartmentList from "../../components/Admin/Departments/DepartmentList";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  root: {
    display: "flex",
    margin: 5,
    paddingBottom: 5,
  },
}));

export default function Departemnts() {
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [open, setOpen] = React.useState(false);

  let admin = getAdmin();

  if (admin == null) {
    window.location.replace("/admin/login");
  }

  const handleLogOut = () => {
    sessionStorage.clear();

    window.location.reload();
  };

  var csrftoken = Cookies.get("csrftoken");
  let config = {
    headers: {
      "X-CSRFToken": csrftoken,
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + admin.token,
    },
  };

  const getDepartments = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACK_END_URL + "/api/departments/",
        config
      );

      if (res) {
        setDepartments(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setOpen(false);
    try {
      let data = {
        DepartmentName: DepartmentName,
      };
      const res = await axios.post(
        process.env.REACT_APP_BACK_END_URL + "/api/departments/new",
        data,
        config
      );

      if (res) {
        setDepartments(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const classes = useStyles();

  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <div className={classes.paper}>
      <div className={classes.row}>
        <Typography variant="h4" component="div" gutterBottom>
          Departments
        </Typography>
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </div>
      <CreateDepartment
        setDepartments={setDepartments}
        setOpen={setOpen}
        open={open}
      />
      <DepartmentList
        departments={departments}
        setDepartments={setDepartments}
      />
    </div>
  );
}

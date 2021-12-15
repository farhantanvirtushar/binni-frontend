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
import EditDepartment from "./EditDepartment";

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

export default function DepartmentList(props) {
  const classes = useStyles();

  var departments = props.departments;

  const [open, setOpen] = useState(false);
  const [departmentToEdit, setDepartmentToEdit] = useState({});

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
        process.env.REACT_APP_BACK_END_URL +
          "/api/departments/" +
          row.department_id +
          "/delete",
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
              <TableCell align="left">Department Name</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((row) => (
              <TableRow key={row.department_id}>
                <TableCell align="left">
                  <img
                    src={row.department_image_url}
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
                      setDepartmentToEdit(row);
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
      <EditDepartment
        department={departmentToEdit}
        open={open}
        setOpen={setOpen}
        setDepartments={props.setDepartments}
      />
    </Paper>
  );
}

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
import EditCategory from "./EditCategory";

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
  var departments = props.departments;

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
      const res = await axios.delete(
        process.env.REACT_APP_BACK_END_URL +
          "/api/categories/" +
          row.category_id,
        config
      );

      if (res) {
        props.setCategories(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDeptName = (dept_id) => {
    for (var i = 0; i < departments.length; i++) {
      if (departments[i].department_id == dept_id) {
        return departments[i].name;
      }
    }
  };

  return (
    <Paper className={classes.root}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Cover Image</TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Category Name</TableCell>
              <TableCell align="left">Department</TableCell>
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
                <TableCell align="left">{row.category_id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  {getDeptName(row.department_id)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={(event) => {
                      setCategoryToEdit(row);
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
      <EditCategory
        departments={props.departments}
        category={categoryToEdit}
        open={open}
        setOpen={setOpen}
        setCategories={props.setCategories}
      />
    </Paper>
  );
}

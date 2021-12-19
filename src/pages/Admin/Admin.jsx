/* eslint-disable */
import React from "react";
import AppBar from "@mui/material/AppBar";
import { Container, Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import classNames from "classnames";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import { useParams } from "react-router-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import { getAdmin } from "../../User";
import Cookies from "js-cookie";

import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "./Dashboard";
import Categories from "./Categories";
import Products from "./Products";
import Orders from "./Orders";
import Topbar from "../../components/Admin/Topbar";
import Sidebar from "../../components/Admin/Sidebar";
import Departemnts from "./Departments";
import Caterings from "./Caterings";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    display: "flex",
    margin: 5,
    paddingBottom: 5,
  },
  appbar: {
    display: "flex",
    flexDirection: "row",
  },
  search: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#439dce",
    borderRadius: 10,
    padding: 5,
  },
  row: {
    marginBottom: theme.spacing(5),
  },
  topbar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(5),
  },
  searchInput: {
    color: "#ffffff",
  },

  contentWrapper: {
    display: "block",
    overflow: "auto",
    position: "relative",
    top: theme.spacing.unit * 8,
    height: "calc(100% - 64px)", // Subtract width of header
    margin: 15,
    backgroundColor: "#e3fffb",
    borderRadius: 15,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  "content-left": {
    marginLeft: drawerWidth + 15,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    padding: theme.spacing(3),
  },
}));

export default function Admin() {
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [searchNum, setSearchNum] = useState("");
  const limit = 5;

  let admin = getAdmin();

  if (admin == null) {
    window.location.replace("/admin/login");
  }

  const handleLogOut = () => {
    sessionStorage.clear();

    window.location.reload();
  };

  const keyPress = async (event) => {
    if (event.keyCode == 13) {
      getAllUsers(1, event.target.value);
      setSearchNum(event.target.value);
      setPage(1);
    }
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

  const getAllUsers = async (pageNo, search) => {
    try {
      var offset = (pageNo - 1) * limit;
      const res = await axios.get(
        process.env.REACT_APP_BACK_END_URL +
          "/api/users?search=%" +
          search +
          "%&limit=" +
          limit +
          "&offset=" +
          offset,
        config
      );

      if (res) {
        setUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = async (event, page) => {
    setPage(page);
    getAllUsers(page, searchNum);
  };

  useEffect(() => {}, []);
  return (
    <div>
      <Router>
        <Topbar open={open} setOpen={setOpen} />
        <Sidebar open={open} />
        <div
          className={classNames(classes.contentWrapper, {
            [classes.contentShift]: open,
            [classes[`content-left`]]: open,
          })}
        >
          <Box component="main" sx={{ p: 3 }}>
            <Switch>
              <Route exact path="/admin/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/admin/departments">
                <Departemnts />
              </Route>
              <Route exact path="/admin/categories">
                <Categories />
              </Route>
              <Route exact path="/admin/products">
                <Products />
              </Route>
              <Route exact path="/admin/orders">
                <Orders />
              </Route>
              <Route exact path="/admin/caterings">
                <Caterings />
              </Route>
            </Switch>
          </Box>
        </div>
      </Router>
    </div>
  );
}

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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

import axios from "axios";

import { getAdmin } from "../../User";

import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import CreateCategory from "../../components/Admin/Categories/CreateCategory";
import ProductList from "../../components/Admin/Products/ProductList";
import CreateProduct from "../../components/Admin/Products/CreateProduct";
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

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryID, setCategoryID] = useState("");
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

  const getCategories = async () => {
    try {
      const res = await axios.get("/api/categories", config);

      if (res) {
        setCategories(res.data);
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = async (event) => {
    setCategoryID(event.target.value);
    try {
      const res = await axios.get(
        "/api/categories/" + event.target.value + "/all",
        config
      );

      if (res) {
        setProducts(res.data);
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
        categoryID: categoryID,
      };
      const res = await axios.post("/api/categories/new", data, config);

      if (res) {
        setCategories(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const classes = useStyles();

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className={classes.paper}>
      <div className={classes.row}>
        <Typography variant="h4" component="div" gutterBottom>
          Products
        </Typography>

        <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={categoryID}
            label="Select Category"
            onChange={handleCategoryChange}
          >
            {categories.map((row) => (
              <MenuItem value={row.category_id}>{row.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </div>
      <CreateProduct
        categoryID={categoryID}
        setProducts={setProducts}
        setOpen={setOpen}
        open={open}
      />
      <ProductList products={products} setProducts={setProducts} />
    </div>
  );
}

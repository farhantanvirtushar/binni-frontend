/* eslint-disable */
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";

import { styled } from "@mui/material/styles";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const font = "'Quicksand', sans-serif";

const theme = createTheme({
  typography: {
    fontFamily: ["Kalam", "cursive"].join(","),
  },
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(5),
  },
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(3),
    background: "#3C3C3C",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    marginRight: 8,
  },
  address: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    color: "#ffffff",
  },
  topbarItemGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#ffffff",
    marginRight: 20,
  },
  searchInput: {
    color: "#ffffff",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.047281812456!2d90.41511171469497!3d23.781330584574185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7994d5e6e31%3A0x4d9b3192d0f5ef4b!2z4Kas4Ka_4Kao4KeN4Kao4Ka_IOCmsOCnh-CmuOCnjeCmn-CngeCmsOCnh-CmqOCnjeCmnw!5e0!3m2!1sen!2sbd!4v1641331072733!5m2!1sen!2sbd"
        width="400"
        height="250"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
      <div className={classes.address}>
        <Typography variant="h3" component="div">
          Binnni Resturant & Catering Service
        </Typography>
        <br />
        <Typography variant="subtitle1">
          56/A, 1st Floor, Concord Sark Building, Road No 132, Dhaka 1212
        </Typography>
        <Typography variant="subtitle1">Call : +8801813262561</Typography>
        <Typography variant="subtitle1">
          Email : binnifoods@gmail.com
        </Typography>
      </div>
    </div>
  );
}

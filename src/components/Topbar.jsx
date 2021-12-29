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
  topbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    background: "#f37553",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    marginRight: 8,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "#ffffff",
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

const ColorIconButton = styled(IconButton)(({ theme }) => ({
  color: "#0000ff",
  backgroundColor: "#ffffff",
  "&:hover": {
    backgroundColor: "#e5f0f1",
  },
}));

export default function Topbar(props) {
  const classes = useStyles();

  const menuRoutes = [
    { name: "Home", link: "" },
    { name: "Caterings", link: "caterings" },
    { name: "Contact", link: "contact" },
    { name: "About Us", link: "about" },
  ];

  return (
    <div className={classes.appBar}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        elevation={1}
      >
        <Toolbar className={classes.title}>
          <ThemeProvider theme={theme}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                color: "#bd2626",
                fontSize: 30,
                textAlign: "center",
              }}
            >
              BINNI RESTURANT & CATERING SERVICE
            </Typography>
          </ThemeProvider>
        </Toolbar>

        <Toolbar className={classes.topbar}>
          <div className={classes.topbarItemGroup}>
            {menuRoutes.map((item) => (
              <Link to={"/" + item.link} className={classes.link}>
                <Button variant="text" style={{ textTransform: "capitalize" }}>
                  <ThemeProvider theme={theme}>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        color: "#ffffff",
                        fontSize: 30,
                      }}
                    >
                      {item.name}
                    </Typography>
                  </ThemeProvider>
                </Button>
              </Link>
            ))}
          </div>

          <Badge
            color="error"
            badgeContent={Object.keys(props.cart).length}
            overlap="circular"
          >
            <Link to={"/checkout"}>
              <ColorIconButton>
                <AddShoppingCartIcon sx={{ fontSize: 40 }} />
              </ColorIconButton>
            </Link>
          </Badge>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

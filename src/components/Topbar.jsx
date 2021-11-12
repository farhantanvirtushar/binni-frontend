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

import { makeStyles } from "@material-ui/core/styles";

const font = "'Quicksand', sans-serif";

const theme = createTheme({
  typography: {
    fontFamily: ["Irish Grover", "cursive"].join(","),
  },
});

const useStyles = makeStyles((theme) => ({
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ffffff",
  },
  topbarItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 20,
  },
  searchInput: {
    color: "#ffffff",
  },
}));

export default function Topbar(props) {
  const classes = useStyles();

  const { open, setOpen } = props;
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        elevation={0}
      >
        <Toolbar className={classes.topbar}>
          <div className={classes.topbarItem}>
            <ThemeProvider theme={theme}>
              <Typography
                variant="h3"
                component="div"
                sx={{
                  flexGrow: 1,
                  color: "#ff0000",
                }}
              >
                BINNI FOODS
              </Typography>
            </ThemeProvider>
          </div>

          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            style={{
              color: "#ff0000",
            }}
          >
            <AddShoppingCartIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

/* eslint-disable */
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { makeStyles } from "@material-ui/core/styles";

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
    background: "#ffffff",
    color: "#000000",
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
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      elevation={0}
    >
      <Toolbar className={classes.topbar}>
        <div className={classes.topbarItem}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Binni Food
          </Typography>
          <IconButton
            size="large"
            color="secondary"
            aria-label="menu"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <MenuIcon />
          </IconButton>
        </div>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
